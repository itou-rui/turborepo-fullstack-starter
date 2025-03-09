import type { APIBase, OmitBaseModelFields } from '../Base';
import type { CreateGuildDetails, IGuildModel } from './IGuild';

/**
 * Represents a guild in the API.
 * Combines IGuildModel without base model fields and APIBase.
 */
export type APIGuild = Omit<IGuildModel, OmitBaseModelFields> & APIBase;

/**
 * Represents the JSON structure for creating a guild via REST API.
 */
export type RESTPostAPIGuildJSON = CreateGuildDetails;
