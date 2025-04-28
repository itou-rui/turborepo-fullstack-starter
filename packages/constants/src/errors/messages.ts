import { RESTAPIErrorJSONCodes } from './code';

export type ErrorMessages = {
  log: string;
  notice: string;
};

const General = {
  log: 'This is a general HTTP error. Please review the implementation of the HTTP request.',
  notice: 'A problem has occurred.',
} as const;

const InvalidBody = {
  log: 'The request body is invalid. Please review the implementation of the body.',
  notice: 'A problem has occurred.',
} as const;

const InvalidParameter = {
  log: 'The request parameter is invalid. Please review the implementation of the parameter.',
  notice: 'An invalid parameter has been set.',
} as const;

const MaximumRetryAttemptsExceeded = {
  log: 'The maximum number of retry attempts has been exceeded. Please review the implementation.',
  notice: 'The maximum number of operation attempts has been exceeded. Please try again after some time.',
} as const;

const UnknownAccount = {
  log: 'An account specified in the `UserDocument` does not exist.',
  notice: 'The specified account could not be found.',
} as const;

const AlreadyAccount = {
  log: 'The specified account already exists in the `UserDocument`, so the creation failed.',
  notice: 'The specified account already exists.',
} as const;

const UnknownGuild = {
  log: 'An unspecified DiscordServer that does not exist in `GuildDocument` was provided.',
  notice: 'The specified Discord server could not be found.',
} as const;

const InvalidEmail = {
  log: 'The specified email address is invalid.',
  notice: 'The specified email address is invalid.',
} as const;

const InvalidPassword = {
  log: 'The specified password is invalid.',
  notice: 'The specified password is invalid.',
} as const;

const MissingUserPassword = {
  log: 'The `password` was not set in the specified `User` document. Please review the implementation.',
  notice: 'A problem has occurred.',
} as const;

export const ERROR_MESSAGES: Record<RESTAPIErrorJSONCodes, ErrorMessages> = {
  [RESTAPIErrorJSONCodes.General]: General,
  [RESTAPIErrorJSONCodes.InvalidBody]: InvalidBody,
  [RESTAPIErrorJSONCodes.InvalidParameter]: InvalidParameter,
  [RESTAPIErrorJSONCodes.MaximumRetryAttemptsExceeded]: MaximumRetryAttemptsExceeded,
  [RESTAPIErrorJSONCodes.UnknownAccount]: UnknownAccount,
  [RESTAPIErrorJSONCodes.UnknownGuild]: UnknownGuild,
  [RESTAPIErrorJSONCodes.AlreadyAccount]: AlreadyAccount,
  [RESTAPIErrorJSONCodes.InvalidEmail]: InvalidEmail,
  [RESTAPIErrorJSONCodes.InvalidPassword]: InvalidPassword,
  [RESTAPIErrorJSONCodes.MissingUserPassword]: MissingUserPassword,
} as const;

const NodeError = {
  log: 'A Node.js error has occurred. Please check the implementation.',
  notice: 'A problem has occurred.',
};

const UnknownError = {
  log: 'An unknown error has occurred. Please check the implementation.',
  notice: 'An unexpected problem has occurred.',
};

export const NODE_ERROR_MESSAGES: Record<'NodeError' | 'UnknownError', ErrorMessages> = {
  NodeError: NodeError,
  UnknownError: UnknownError,
};
