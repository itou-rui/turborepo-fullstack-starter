export enum RESTAPIErrorJSONCodes {
  GeneralError,
  BadRequest,

  UnknownAccount = 10_001,
  UnknownUser,

  AlreadyUser = 20_001,

  InvalidCredentials = 30_001,
}
