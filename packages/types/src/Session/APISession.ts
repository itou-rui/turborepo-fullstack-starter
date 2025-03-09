import type { OmitBaseModelFields } from '../Base';
import type { ISessionModel, ISessionModelDocumentFields } from './ISession';

/**
 * Type representing a session in the API, omitting certain fields.
 */
export type APISession<T> = Omit<ISessionModel<T>, OmitBaseModelFields | ISessionModelDocumentFields>;
