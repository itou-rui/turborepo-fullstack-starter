import Joi from 'joi';

export interface EnvironmentVariables {
  MONGODB_USER_NAME: string;
  MONGODB_USER_PASSWORD: string;
  MONGODB_HOST_NAME: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  MONGODB_USER_NAME: Joi.string().required(),
  MONGODB_USER_PASSWORD: Joi.string().required(),
  MONGODB_HOST_NAME: Joi.string().required(),
});
