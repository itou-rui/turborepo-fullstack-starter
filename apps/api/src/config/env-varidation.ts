import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import Joi from 'joi';

/**
 * Interface representing the environment variables.
 */
export interface EnvironmentVariables {
  /**
   * The port number on which the server will run.
   */
  PORT?: string;

  /**
   * The hostname of the server.
   */
  HOSTNAME?: string;

  /**
   * The base URL of the application.
   */
  BASE_URL?: string;

  /**
   * The format of the logs.
   */
  LOG_FORMAT?: string;

  /**
   * The username for MongoDB authentication.
   */
  MONGODB_USER_NAME: string;

  /**
   * The password for MongoDB authentication.
   */
  MONGODB_USER_PASSWORD: string;

  /**
   * The hostname of the MongoDB server.
   */
  MONGODB_HOST_NAME: string;

  /**
   * The secret key for JWT authentication.
   */
  JWT_SECRET: string;
}

/**
 * DTO class for validating environment variables.
 */
export class EnvironmentVariablesDto {
  @IsString()
  @IsOptional()
  /**
   * The port number on which the server will run.
   */
  PORT?: string;

  @IsString()
  @IsOptional()
  /**
   * The hostname of the server.
   */
  HOSTNAME?: string;

  @IsString()
  @IsOptional()
  /**
   * The base URL of the application.
   */
  BASE_URL?: string;

  @IsString()
  @IsOptional()
  /**
   * The format of the logs.
   */
  LOG_FORMAT?: string;

  @IsString()
  @IsNotEmpty()
  /**
   * The username for MongoDB authentication.
   */
  MONGODB_USER_NAME!: string;

  @IsString()
  @IsNotEmpty()
  /**
   * The password for MongoDB authentication.
   */
  MONGODB_USER_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  /**
   * The hostname of the MongoDB server.
   */
  MONGODB_HOST_NAME!: string;

  @IsString()
  @IsNotEmpty()
  /**
   * The secret key for JWT authentication.
   */
  JWT_SECRET!: string;
}

/**
 * Joi validation schema for environment variables.
 */
export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  /**
   * System
   */
  PORT: Joi.string().default('5002'),
  HOSTNAME: Joi.string().default('0.0.0.0'),
  BASE_URL: Joi.string().default('http://localhost:8080'),
  LOG_FORMAT: Joi.string().default('text'),

  /**
   * Application
   */
  MONGODB_USER_NAME: Joi.string().required(),
  MONGODB_USER_PASSWORD: Joi.string().required(),
  MONGODB_HOST_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
