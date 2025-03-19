import { HttpStatus } from '@nestjs/common';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { APIException } from './api.exception';

/**
 * Exception for Bad Request (400) errors.
 */
export class BadRequestAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.BAD_REQUEST, errors);
  }
}

/**
 * Exception for Unauthorized (401) errors.
 */
export class UnauthorizedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.UNAUTHORIZED, errors);
  }
}

/**
 * Exception for Payment Required (402) errors.
 */
export class PaymentRequiredAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.PAYMENT_REQUIRED, errors);
  }
}

/**
 * Exception for Forbidden (403) errors.
 */
export class ForbiddenAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.FORBIDDEN, errors);
  }
}

/**
 * Exception for Not Found (404) errors.
 */
export class NotFoundAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.NOT_FOUND, errors);
  }
}

/**
 * Exception for Method Not Allowed (405) errors.
 */
export class MethodNotAllowedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.METHOD_NOT_ALLOWED, errors);
  }
}

/**
 * Exception for Not Acceptable (406) errors.
 */
export class NotAcceptableAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.NOT_ACCEPTABLE, errors);
  }
}

/**
 * Exception for Proxy Authentication Required (407) errors.
 */
export class ProxyAuthenticationRequiredAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.PROXY_AUTHENTICATION_REQUIRED, errors);
  }
}

/**
 * Exception for Request Timeout (408) errors.
 */
export class RequestTimeoutAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.REQUEST_TIMEOUT, errors);
  }
}

/**
 * Exception for Conflict (409) errors.
 */
export class ConflictAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.CONFLICT, errors);
  }
}

/**
 * Exception for Gone (410) errors.
 */
export class GoneAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.GONE, errors);
  }
}

/**
 * Exception for Length Required (411) errors.
 */
export class LengthRequiredAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.LENGTH_REQUIRED, errors);
  }
}

/**
 * Exception for Precondition Failed (412) errors.
 */
export class PreconditionFailedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.PRECONDITION_FAILED, errors);
  }
}

/**
 * Exception for Payload Too Large (413) errors.
 */
export class PayloadTooLargeAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.PAYLOAD_TOO_LARGE, errors);
  }
}

/**
 * Exception for URI Too Long (414) errors.
 */
export class UriTooLongAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.URI_TOO_LONG, errors);
  }
}

/**
 * Exception for Unsupported Media Type (415) errors.
 */
export class UnsupportedMediaTypeAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.UNSUPPORTED_MEDIA_TYPE, errors);
  }
}

/**
 * Exception for Requested Range Not Satisfiable (416) errors.
 */
export class RequestedRangeNotSatisfiableAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, errors);
  }
}

/**
 * Exception for Expectation Failed (417) errors.
 */
export class ExpectationFailedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.EXPECTATION_FAILED, errors);
  }
}

/**
 * Exception for I'm a Teapot (418) errors.
 */
export class IAmATeapotAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.I_AM_A_TEAPOT, errors);
  }
}

/**
 * Exception for Misdirected Request (421) errors.
 */
export class MisdirectedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.MISDIRECTED, errors);
  }
}

/**
 * Exception for Unprocessable Entity (422) errors.
 */
export class UnprocessableEntityAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.UNPROCESSABLE_ENTITY, errors);
  }
}

/**
 * Exception for Failed Dependency (424) errors.
 */
export class FailedDependencyAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.FAILED_DEPENDENCY, errors);
  }
}

/**
 * Exception for Precondition Required (428) errors.
 */
export class PreconditionRequiredAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.PRECONDITION_REQUIRED, errors);
  }
}

/**
 * Exception for Too Many Requests (429) errors.
 */
export class TooManyRequestsAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.TOO_MANY_REQUESTS, errors);
  }
}

/**
 * Exception for Internal Server Error (500) errors.
 */
export class InternalServerErrorAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.INTERNAL_SERVER_ERROR, errors);
  }
}

/**
 * Exception for Not Implemented (501) errors.
 */
export class NotImplementedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.NOT_IMPLEMENTED, errors);
  }
}

/**
 * Exception for Bad Gateway (502) errors.
 */
export class BadGatewayAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.BAD_GATEWAY, errors);
  }
}

/**
 * Exception for Service Unavailable (503) errors.
 */
export class ServiceUnavailableAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.SERVICE_UNAVAILABLE, errors);
  }
}

/**
 * Exception for Gateway Timeout (504) errors.
 */
export class GatewayTimeoutAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.GATEWAY_TIMEOUT, errors);
  }
}

/**
 * Exception for HTTP Version Not Supported (505) errors.
 */
export class HttpVersionNotSupportedAPIException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.HTTP_VERSION_NOT_SUPPORTED, errors);
  }
}
