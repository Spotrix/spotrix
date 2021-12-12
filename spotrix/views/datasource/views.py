# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
import json
from collections import Counter
from typing import Any

from flask import request
from flask_appbuilder import expose
from flask_appbuilder.api import rison
from flask_appbuilder.security.decorators import has_access_api
from flask_babel import _
from marshmallow import ValidationError
from sqlalchemy.exc import NoSuchTableError
from sqlalchemy.orm.exc import NoResultFound

from spotrix import app, db, event_logger
from spotrix.connectors.connector_registry import ConnectorRegistry
from spotrix.connectors.sqla.utils import get_physical_table_metadata
from spotrix.datasets.commands.exceptions import (
    DatasetForbiddenError,
    DatasetNotFoundError,
)
from spotrix.exceptions import SpotrixException, SpotrixSecurityException
from spotrix.models.core import Database
from spotrix.x_typing import FlaskResponse
from spotrix.views.base import (
    api,
    BaseSpotrixView,
    check_ownership,
    handle_api_exception,
    json_error_response,
)
from spotrix.views.datasource.schemas import (
    ExternalMetadataParams,
    ExternalMetadataSchema,
    get_external_metadata_schema,
)


class Datasource(BaseSpotrixView):
    """Datasource-related views"""

    @expose("/save/", methods=["POST"])
    @event_logger.log_this_with_context(
        action=lambda self, *args, **kwargs: f"{self.__class__.__name__}.save",
        log_to_statsd=False,
    )
    @has_access_api
    @api
    @handle_api_exception
    def save(self) -> FlaskResponse:
        data = request.form.get("data")
        if not isinstance(data, str):
            return json_error_response(_("Request missing data field."), status=500)

        datasource_dict = json.loads(data)
        datasource_id = datasource_dict.get("id")
        datasource_type = datasource_dict.get("type")
        database_id = datasource_dict["database"].get("id")
        orm_datasource = ConnectorRegistry.get_datasource(
            datasource_type, datasource_id, db.session
        )
        orm_datasource.database_id = database_id

        if "owners" in datasource_dict and orm_datasource.owner_class is not None:
            # Check ownership
            if app.config["OLD_API_CHECK_DATASET_OWNERSHIP"]:
                try:
                    check_ownership(orm_datasource)
                except SpotrixSecurityException:
                    raise DatasetForbiddenError()

            datasource_dict["owners"] = (
                db.session.query(orm_datasource.owner_class)
                .filter(orm_datasource.owner_class.id.in_(datasource_dict["owners"]))
                .all()
            )

        duplicates = [
            name
            for name, count in Counter(
                [col["column_name"] for col in datasource_dict["columns"]]
            ).items()
            if count > 1
        ]
        if duplicates:
            return json_error_response(
                _(
                    "Duplicate column name(s): %(columns)s",
                    columns=",".join(duplicates),
                ),
                status=409,
            )
        orm_datasource.update_from_object(datasource_dict)
        data = orm_datasource.data
        db.session.commit()

        return self.json_response(data)

    @expose("/get/<datasource_type>/<datasource_id>/")
    @has_access_api
    @api
    @handle_api_exception
    def get(self, datasource_type: str, datasource_id: int) -> FlaskResponse:
        datasource = ConnectorRegistry.get_datasource(
            datasource_type, datasource_id, db.session
        )
        return self.json_response(datasource.data)

    @expose("/external_metadata/<datasource_type>/<datasource_id>/")
    @has_access_api
    @api
    @handle_api_exception
    def external_metadata(
        self, datasource_type: str, datasource_id: int
    ) -> FlaskResponse:
        """Gets column info from the source system"""
        datasource = ConnectorRegistry.get_datasource(
            datasource_type, datasource_id, db.session
        )
        try:
            external_metadata = datasource.external_metadata()
        except SpotrixException as ex:
            return json_error_response(str(ex), status=400)
        return self.json_response(external_metadata)

    @expose("/external_metadata_by_name/")
    @has_access_api
    @api
    @handle_api_exception
    @rison(get_external_metadata_schema)
    def external_metadata_by_name(self, **kwargs: Any) -> FlaskResponse:
        """Gets table metadata from the source system and SQLAlchemy inspector"""
        try:
            params: ExternalMetadataParams = (
                ExternalMetadataSchema().load(kwargs.get("rison"))
            )
        except ValidationError as err:
            return json_error_response(str(err), status=400)

        datasource = ConnectorRegistry.get_datasource_by_name(
            session=db.session,
            datasource_type=params["datasource_type"],
            database_name=params["database_name"],
            schema=params["schema_name"],
            datasource_name=params["table_name"],
        )
        try:
            if datasource is not None:
                # Get columns from spotrix metadata
                external_metadata = datasource.external_metadata()
            else:
                # Use the SQLAlchemy inspector to get columns
                database = (
                    db.session.query(Database)
                    .filter_by(database_name=params["database_name"])
                    .one()
                )
                external_metadata = get_physical_table_metadata(
                    database=database,
                    table_name=params["table_name"],
                    schema_name=params["schema_name"],
                )
        except (NoResultFound, NoSuchTableError):
            raise DatasetNotFoundError
        return self.json_response(external_metadata)
