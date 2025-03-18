export enum RESTAPIErrorJSONCodes {
  // 1000-1999: General Errors
  GeneralError = 1000,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  Conflict,
  TooManyRequests,
  InternalServerError,
  ServiceUnavailable,

  // 10000-10999: Account/User Related
  UnknownAccount = 10_001,
  UnknownUser,
  AccountDisabled,
  AccountLocked,
  EmailNotVerified,

  // 20000-20999: Registration Related
  AlreadyUser = 20_001,
  InvalidUsername,
  WeakPassword,
  DuplicateEmail,

  // 30000-30999: Authentication Related
  InvalidCredentials = 30_001,
  SessionExpired,
}
