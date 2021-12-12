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
from collections import defaultdict
from typing import Any, Dict, List, Optional

from flask_babel import gettext as _
from marshmallow import ValidationError

from spotrix.errors import ErrorLevel, SpotrixError, SpotrixErrorType


class SpotrixException(Exception):
    status = 500
    message = ""

    def __init__(
        self, message: str = "", exception: Optional[Exception] = None,
    ) -> None:
        if message:
            self.message = message
        self._exception = exception
        super().__init__(self.message)

    @property
    def exception(self) -> Optional[Exception]:
        return self._exception


class SpotrixErrorException(SpotrixException):
    """Exceptions with a single SpotrixErrorType associated with them"""

    def __init__(self, error: SpotrixError, status: Optional[int] = None) -> None:
        super().__init__(error.message)
        self.error = error
        if status is not None:
            self.status = status


class SpotrixGenericErrorException(SpotrixErrorException):
    """Exceptions that are too generic to have their own type"""

    def __init__(self, message: str, status: Optional[int] = None) -> None:
        super().__init__(
            SpotrixError(
                message=message,
                error_type=SpotrixErrorType.GENERIC_BACKEND_ERROR,
                level=ErrorLevel.ERROR,
            )
        )
        if status is not None:
            self.status = status


class SpotrixErrorFromParamsException(SpotrixErrorException):
    """Exceptions that pass in parameters to construct a SpotrixError"""

    def __init__(
        self,
        error_type: SpotrixErrorType,
        message: str,
        level: ErrorLevel,
        extra: Optional[Dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            SpotrixError(
                error_type=error_type, message=message, level=level, extra=extra or {}
            )
        )


class SpotrixCancelErrorsException(SpotrixException):
    """Exceptions with multiple SpotrixErrorType associated with them"""

    def __init__(
        self, errors: List[SpotrixError], status: Optional[int] = None
    ) -> None:
        super().__init__(str(errors))
        self.errors = errors
        if status is not None:
            self.status = status


class SpotrixTimeoutException(SpotrixErrorFromParamsException):
    status = 408


class SpotrixGenericDBErrorException(SpotrixErrorFromParamsException):
    status = 400

    def __init__(
        self,
        message: str,
        level: ErrorLevel = ErrorLevel.ERROR,
        extra: Optional[Dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            SpotrixErrorType.GENERIC_DB_ENGINE_ERROR, message, level, extra,
        )


class SpotrixTemplateParamsErrorException(SpotrixErrorFromParamsException):
    status = 400

    def __init__(
        self,
        message: str,
        error: SpotrixErrorType,
        level: ErrorLevel = ErrorLevel.ERROR,
        extra: Optional[Dict[str, Any]] = None,
    ) -> None:
        super().__init__(
            error, message, level, extra,
        )


class SpotrixSecurityException(SpotrixErrorException):
    status = 401

    def __init__(
        self, error: SpotrixError, payload: Optional[Dict[str, Any]] = None
    ) -> None:
        super().__init__(error)
        self.payload = payload


class SpotrixVizException(SpotrixCancelErrorsException):
    status = 400


class NoDataException(SpotrixException):
    status = 400


class NullValueException(SpotrixException):
    status = 400


class SpotrixTemplateException(SpotrixException):
    pass


class SpatialException(SpotrixException):
    pass


class CertificateException(SpotrixException):
    message = _("Invalid certificate")


class DatabaseNotFound(SpotrixException):
    status = 400


class QueryObjectValidationError(SpotrixException):
    status = 400


class CacheLoadError(SpotrixException):
    status = 404


class DashboardImportException(SpotrixException):
    pass


class SerializationError(SpotrixException):
    pass


class InvalidPayloadFormatError(SpotrixErrorException):
    status = 400

    def __init__(self, message: str = "Request payload has incorrect format"):
        error = SpotrixError(
            message=message,
            error_type=SpotrixErrorType.INVALID_PAYLOAD_FORMAT_ERROR,
            level=ErrorLevel.ERROR,
        )
        super().__init__(error)


class InvalidPayloadSchemaError(SpotrixErrorException):
    status = 422

    def __init__(self, error: ValidationError):
        # dataclasses.asdict does not work with defaultdict, convert to dict
        # https://bugs.python.org/issue35540
        for k, v in error.messages.items():
            if isinstance(v, defaultdict):
                error.messages[k] = dict(v)
        error = SpotrixError(
            message="An error happened when validating the request",
            error_type=SpotrixErrorType.INVALID_PAYLOAD_SCHEMA_ERROR,
            level=ErrorLevel.ERROR,
            extra={"messages": error.messages},
        )
        super().__init__(error)


class SpotrixCancelQueryException(SpotrixException):
    pass
