export enum RESTAPIErrorJSONCodes {
  General = 0,
  InvalidBody,
  InvalidParameter,
  MaximumRetryAttemptsExceeded,

  // 10000-10999: Account Related
  UnknownAccount = 10001,
  UnknownGuild,

  // 20000-20999: Registration Related
  AlreadyAccount = 20001,

  // 30000-30999: Authentication Related
  InvalidEmail = 30001,
  InvalidPassword,
  MissingUserPassword,
}
