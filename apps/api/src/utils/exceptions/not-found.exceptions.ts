import { type RESTErrorData } from '@workspace/types';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { NotFoundAPIException } from './http-exceptions';

export class UserNotFoundException extends NotFoundAPIException {
  constructor(uid: string, errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.UnknownAccount, `User with ID ${uid} not found.`, errors);
  }
}

export class GuildNotFoundException extends NotFoundAPIException {
  constructor(guildId: string, errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.UnknownGuild, `Guild with ID ${guildId} not found.`, errors);
  }
}
