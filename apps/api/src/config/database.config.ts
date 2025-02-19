import { registerAs } from '@nestjs/config';
import { type MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const CONFIG_DATABASE = 'database' as const;

interface CreateConfig extends MongooseModuleFactoryOptions {
  databaseName: string;
  connectionName?: string;
}

const createDatabaseConfig = (userName: string, password: string, hostName: string, config: CreateConfig) => {
  const { connectionName, databaseName, ...options } = config;
  return {
    uri: `mongodb+srv://${userName}:${password}@${hostName}.mongodb.net/${databaseName}`,
    connectionName: config.connectionName || `app_${config.databaseName}`,
    options: {
      maxPoolSize: 50,
      minPoolSize: 10,
      maxIdleTimeMS: 30000,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      w: 'majority' as const,
      ...options,
    },
  };
};

export interface DatabaseConfig {
  main: ReturnType<typeof createDatabaseConfig>;
}

export const databaseConfig = registerAs(CONFIG_DATABASE, () => {
  const USER_NAME = process.env.MONGODB_USER_NAME as string;
  const PASSWORD = process.env.MONGODB_USER_PASSWORD as string;
  const HOST_NAME = process.env.MONGODB_HOST_NAME as string;

  return {
    main: createDatabaseConfig(USER_NAME, PASSWORD, HOST_NAME, {
      databaseName: 'main',
    }),
  };
});
