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
import logging
from typing import Optional

from flask_appbuilder.models.sqla import Model
from flask_appbuilder.security.sqla.models import User

from spotrix.commands.base import BaseCommand
from spotrix.connectors.sqla.models import SqlMetric
from spotrix.dao.exceptions import DAODeleteFailedError
from spotrix.datasets.dao import DatasetDAO
from spotrix.datasets.metrics.commands.exceptions import (
    DatasetMetricDeleteFailedError,
    DatasetMetricForbiddenError,
    DatasetMetricNotFoundError,
)
from spotrix.exceptions import SpotrixSecurityException
from spotrix.views.base import check_ownership

logger = logging.getLogger(__name__)


class DeleteDatasetMetricCommand(BaseCommand):
    def __init__(self, user: User, dataset_id: int, model_id: int):
        self._actor = user
        self._dataset_id = dataset_id
        self._model_id = model_id
        self._model: Optional[SqlMetric] = None

    def run(self) -> Model:
        self.validate()
        try:
            if not self._model:
                raise DatasetMetricNotFoundError()
            column = DatasetDAO.delete_metric(self._model)
            return column
        except DAODeleteFailedError as ex:
            logger.exception(ex.exception)
            raise DatasetMetricDeleteFailedError()

    def validate(self) -> None:
        # Validate/populate model exists
        self._model = DatasetDAO.find_dataset_metric(self._dataset_id, self._model_id)
        if not self._model:
            raise DatasetMetricNotFoundError()
        # Check ownership
        try:
            check_ownership(self._model)
        except SpotrixSecurityException:
            raise DatasetMetricForbiddenError()
