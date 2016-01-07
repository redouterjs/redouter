// list of HTTP status codes as constants + helpers

export const CONTINUE = 100;
export const SWITCHING_PROTOCOLS = 101;
export const PROCESSING = 102;

export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const NON_AUTHORITATIVE_INFORMATION = 203;
export const NO_CONTENT = 204
export const RESET_CONTENT = 205
export const PARTIAL_CONTENT = 206
export const MULTI_STATUS = 207

export const MULTIPLE_CHOICES = 300
export const MOVED_PERMANENTLY = 301
export const MOVED_TEMPORARILY = 302
export const SEE_OTHER = 303
export const NOT_MODIFIED = 304
export const USE_PROXY = 305
export const TEMPORARY_REDIRECT = 307
export const PERMANENT_REDIRECT = 308

export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const PAYMENT_REQURED = 402
export const FORBIDDEN = 403
export const NOT_FOUND = 404
export const METHOD_NOT_ALLOWED = 405
export const NOT_ACCEPTABLE = 406
export const PROXY_AUTHENTICATION_REQUIRED = 406
export const REQUEST_TIME_OUT = 408
export const CONFLICT = 409
export const GONE = 410
export const LENGTH_REQUIRED = 411
export const PRECONDITION_FAILED = 412
export const REQUEST_ENTITY_TOO_LARGE = 413
export const REQUEST_URI_TOO_LARGE = 414
export const UNSUPPORTED_MEDIA_TYPE = 415
export const REQUEST_RANGE_NOT_SATISFIED = 416
export const EXPECTATION_FAILED = 417

export const UNPROCESSABLE_ENTITY = 422
export const LOCKED = 423
export const FAILED_DEPENDENCY = 424
export const UNORDERED_COLLECTION = 425
export const UPGRADE_REQUIRED = 426
export const PRECONDITION_REQUIRED = 428
export const TOO_MANY_REQUESTS = 429
export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431

export const INTERNAL_SERVER_ERROR = 500
export const NOT_IMPLEMENTED = 501
export const BAD_GATEWAY = 502
export const SERVICE_UNAVAILABLE = 503
export const GATEWAY_TIMEOUT = 504
export const HTTP_VERSION_NOT_SUPPORTED = 505
export const VARIANT_ALSO_NEGOTIATES = 506
export const INSUFFICIENT_STORAGE = 507
export const BANDWIDTH_LIMIT_EXCEEDED = 509
export const NOT_EXTENDED = 510
export const NETWORK_AUTHENTICATION_REQUIRED = 511

export const isOK = statusCode => [OK, CREATED, ACCEPTED, NON_AUTHORITATIVE_INFORMATION, NO_CONTENT, RESET_CONTENT, PARTIAL_CONTENT, MULTI_STATUS].includes(statusCode);
export const isErrorCode = statusCode => statusCode >= 400;
export const isRedirect = statusCode => [MOVED_PERMANENTLY, MOVED_TEMPORARILY, TEMPORARY_REDIRECT, PERMANENT_REDIRECT].includes(statusCode);