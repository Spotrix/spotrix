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
# pylint: disable=too-few-public-methods,invalid-name
from dataclasses import dataclass  # pylint: disable=wrong-import-order
from enum import Enum
from typing import Any, Dict, Optional

from flask_babel import gettext as _


class SpotrixErrorType(str, Enum):
    """
    Types of errors that can exist within Spotrix.

    Keep in sync with spotrix-frontend/src/components/ErrorMessage/types.ts
    and docs/src/pages/docs/Miscellaneous/issue_codes.mdx
    """

    # Frontend errors
    FRONTEND_CSRF_ERROR = "FRONTEND_CSRF_ERROR"
    FRONTEND_NETWORK_ERROR = "FRONTEND_NETWORK_ERROR"
    FRONTEND_TIMEOUT_ERROR = "FRONTEND_TIMEOUT_ERROR"

    # DB Engine errors
    GENERIC_DB_ENGINE_ERROR = "GENERIC_DB_ENGINE_ERROR"
    COLUMN_DOES_NOT_EXIST_ERROR = "COLUMN_DOES_NOT_EXIST_ERROR"
    TABLE_DOES_NOT_EXIST_ERROR = "TABLE_DOES_NOT_EXIST_ERROR"
    SCHEMA_DOES_NOT_EXIST_ERROR = "SCHEMA_DOES_NOT_EXIST_ERROR"
    CONNECTION_INVALID_USERNAME_ERROR = "CONNECTION_INVALID_USERNAME_ERROR"
    CONNECTION_INVALID_PASSWORD_ERROR = "CONNECTION_INVALID_PASSWORD_ERROR"
    CONNECTION_INVALID_HOSTNAME_ERROR = "CONNECTION_INVALID_HOSTNAME_ERROR"
    CONNECTION_PORT_CLOSED_ERROR = "CONNECTION_PORT_CLOSED_ERROR"
    CONNECTION_INVALID_PORT_ERROR = "CONNECTION_INVALID_PORT_ERROR"
    CONNECTION_HOST_DOWN_ERROR = "CONNECTION_HOST_DOWN_ERROR"
    CONNECTION_ACCESS_DENIED_ERROR = "CONNECTION_ACCESS_DENIED_ERROR"
    CONNECTION_UNKNOWN_DATABASE_ERROR = "CONNECTION_UNKNOWN_DATABASE_ERROR"
    CONNECTION_DATABASE_PERMISSIONS_ERROR = "CONNECTION_DATABASE_PERMISSIONS_ERROR"
    CONNECTION_MISSING_PARAMETERS_ERROR = "CONNECTION_MISSING_PARAMETERS_ERROR"
    OBJECT_DOES_NOT_EXIST_ERROR = "OBJECT_DOES_NOT_EXIST_ERROR"
    SYNTAX_ERROR = "SYNTAX_ERROR"

    # Viz errors
    VIZ_GET_DF_ERROR = "VIZ_GET_DF_ERROR"
    UNKNOWN_DATASOURCE_TYPE_ERROR = "UNKNOWN_DATASOURCE_TYPE_ERROR"
    FAILED_FETCHING_DATASOURCE_INFO_ERROR = "FAILED_FETCHING_DATASOURCE_INFO_ERROR"

    # Security access errors
    TABLE_SECURITY_ACCESS_ERROR = "TABLE_SECURITY_ACCESS_ERROR"
    DATASOURCE_SECURITY_ACCESS_ERROR = "DATASOURCE_SECURITY_ACCESS_ERROR"
    DATABASE_SECURITY_ACCESS_ERROR = "DATABASE_SECURITY_ACCESS_ERROR"
    QUERY_SECURITY_ACCESS_ERROR = "QUERY_SECURITY_ACCESS_ERROR"
    MISSING_OWNERSHIP_ERROR = "MISSING_OWNERSHIP_ERROR"

    # Other errors
    BACKEND_TIMEOUT_ERROR = "BACKEND_TIMEOUT_ERROR"
    DATABASE_NOT_FOUND_ERROR = "DATABASE_NOT_FOUND_ERROR"

    # Sql Lab errors
    MISSING_TEMPLATE_PARAMS_ERROR = "MISSING_TEMPLATE_PARAMS_ERROR"
    INVALID_TEMPLATE_PARAMS_ERROR = "INVALID_TEMPLATE_PARAMS_ERROR"
    RESULTS_BACKEND_NOT_CONFIGURED_ERROR = "RESULTS_BACKEND_NOT_CONFIGURED_ERROR"
    DML_NOT_ALLOWED_ERROR = "DML_NOT_ALLOWED_ERROR"
    INVALID_CTAS_QUERY_ERROR = "INVALID_CTAS_QUERY_ERROR"
    INVALID_CVAS_QUERY_ERROR = "INVALID_CVAS_QUERY_ERROR"
    SQLLAB_TIMEOUT_ERROR = "SQLLAB_TIMEOUT_ERROR"
    RESULTS_BACKEND_ERROR = "RESULTS_BACKEND_ERROR"
    ASYNC_WORKERS_ERROR = "ASYNC_WORKERS_ERROR"

    # Generic errors
    GENERIC_COMMAND_ERROR = "GENERIC_COMMAND_ERROR"
    GENERIC_BACKEND_ERROR = "GENERIC_BACKEND_ERROR"

    # API errors
    INVALID_PAYLOAD_FORMAT_ERROR = "INVALID_PAYLOAD_FORMAT_ERROR"
    INVALID_PAYLOAD_SCHEMA_ERROR = "INVALID_PAYLOAD_SCHEMA_ERROR"


ISSUE_CODES = {
    1000: _("The datasource is too large to query."),
    1001: _("The database is under an unusual load."),
    1002: _("The database returned an unexpected error."),
    1003: _(
        "There is a syntax error in the SQL query. "
        "Perhaps there was a misspelling or a typo."
    ),
    1004: _("The column was deleted or renamed in the database."),
    1005: _("The table was deleted or renamed in the database."),
    1006: _("One or more parameters specified in the query are missing."),
    1007: _("The hostname provided can't be resolved."),
    1008: _("The port is closed."),
    1009: _("The host might be down, and can't be reached on the provided port."),
    1010: _("Spotrix encountered an error while running a command."),
    1011: _("Spotrix encountered an unexpected error."),
    1012: _("The username provided when connecting to a database is not valid."),
    1013: _("The password provided when connecting to a database is not valid."),
    1014: _("Either the username or the password is wrong."),
    1015: _("Either the database is spelled incorrectly or does not exist."),
    1016: _("The schema was deleted or renamed in the database."),
    1017: _("User doesn't have the proper permissions."),
    1018: _("One or more parameters needed to configure a database are missing."),
    1019: _("The submitted payload has the incorrect format."),
    1020: _("The submitted payload has the incorrect schema."),
    1021: _("Results backend needed for asynchronous queries is not configured."),
    1022: _("Database does not allow data manipulation."),
    1023: _(
        "The CTAS (create table as select) doesn't have a "
        "SELECT statement at the end. Please make sure your query has a "
        "SELECT as its last statement. Then, try running your query again."
    ),
    1024: _("CVAS (create view as select) query has more than one statement."),
    1025: _("CVAS (create view as select) query is not a SELECT statement."),
    1026: _("Query is too complex and takes too long to run."),
    1027: _("The database is currently running too many queries."),
    1028: _("One or more parameters specified in the query are malformatted."),
    1029: _("The object does not exist in the given database."),
    1030: _("The query has a syntax error."),
    1031: _("The results backend no longer has the data from the query."),
    1032: _("The query associated with the results was deleted."),
    1033: _(
        "The results stored in the backend were stored in a "
        "different format, and no longer can be deserialized."
    ),
    1034: _("The port number is invalid."),
    1035: _("Failed to start remote query on a worker."),
    1036: _("The database was deleted."),
}


ERROR_TYPES_TO_ISSUE_CODES_MAPPING = {
    SpotrixErrorType.BACKEND_TIMEOUT_ERROR: [1000, 1001],
    SpotrixErrorType.GENERIC_DB_ENGINE_ERROR: [1002],
    SpotrixErrorType.COLUMN_DOES_NOT_EXIST_ERROR: [1003, 1004],
    SpotrixErrorType.TABLE_DOES_NOT_EXIST_ERROR: [1003, 1005],
    SpotrixErrorType.SCHEMA_DOES_NOT_EXIST_ERROR: [1003, 1016],
    SpotrixErrorType.MISSING_TEMPLATE_PARAMS_ERROR: [1006],
    SpotrixErrorType.INVALID_TEMPLATE_PARAMS_ERROR: [1028],
    SpotrixErrorType.RESULTS_BACKEND_NOT_CONFIGURED_ERROR: [1021],
    SpotrixErrorType.DML_NOT_ALLOWED_ERROR: [1022],
    SpotrixErrorType.CONNECTION_INVALID_HOSTNAME_ERROR: [1007],
    SpotrixErrorType.CONNECTION_PORT_CLOSED_ERROR: [1008],
    SpotrixErrorType.CONNECTION_HOST_DOWN_ERROR: [1009],
    SpotrixErrorType.GENERIC_COMMAND_ERROR: [1010],
    SpotrixErrorType.GENERIC_BACKEND_ERROR: [1011],
    SpotrixErrorType.CONNECTION_INVALID_USERNAME_ERROR: [1012],
    SpotrixErrorType.CONNECTION_INVALID_PASSWORD_ERROR: [1013],
    SpotrixErrorType.CONNECTION_ACCESS_DENIED_ERROR: [1014, 1015],
    SpotrixErrorType.CONNECTION_UNKNOWN_DATABASE_ERROR: [1015],
    SpotrixErrorType.CONNECTION_DATABASE_PERMISSIONS_ERROR: [1017],
    SpotrixErrorType.CONNECTION_MISSING_PARAMETERS_ERROR: [1018],
    SpotrixErrorType.INVALID_PAYLOAD_FORMAT_ERROR: [1019],
    SpotrixErrorType.INVALID_PAYLOAD_SCHEMA_ERROR: [1020],
    SpotrixErrorType.INVALID_CTAS_QUERY_ERROR: [1023],
    SpotrixErrorType.INVALID_CVAS_QUERY_ERROR: [1024, 1025],
    SpotrixErrorType.SQLLAB_TIMEOUT_ERROR: [1026, 1027],
    SpotrixErrorType.OBJECT_DOES_NOT_EXIST_ERROR: [1029],
    SpotrixErrorType.SYNTAX_ERROR: [1030],
    SpotrixErrorType.RESULTS_BACKEND_ERROR: [1031, 1032, 1033],
    SpotrixErrorType.CONNECTION_INVALID_PORT_ERROR: [1034],
    SpotrixErrorType.ASYNC_WORKERS_ERROR: [1035],
    SpotrixErrorType.DATABASE_NOT_FOUND_ERROR: [1011, 1036],
}


class ErrorLevel(str, Enum):
    """
    Levels of errors that can exist within Spotrix.

    Keep in sync with spotrix-frontend/src/components/ErrorMessage/types.ts
    """

    INFO = "info"
    WARNING = "warning"
    ERROR = "error"


@dataclass
class SpotrixError:
    """
    An error that is returned to a client.
    """

    message: str
    error_type: SpotrixErrorType
    level: ErrorLevel
    extra: Optional[Dict[str, Any]] = None

    def __post_init__(self) -> None:
        """
        Mutates the extra params with user facing error codes that map to backend
        errors.
        """
        issue_codes = ERROR_TYPES_TO_ISSUE_CODES_MAPPING.get(self.error_type)
        if issue_codes:
            self.extra = self.extra or {}
            self.extra.update(
                {
                    "issue_codes": [
                        {
                            "code": issue_code,
                            "message": (
                                f"Issue {issue_code} - {ISSUE_CODES[issue_code]}"
                            ),
                        }
                        for issue_code in issue_codes
                    ]
                }
            )
