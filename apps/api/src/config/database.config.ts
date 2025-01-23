import { registerAs } from '@nestjs/config';

export const CONFIG_DATABASE = 'database' as const;

export const databaseConfig = registerAs(CONFIG_DATABASE, () => {
  const USER_NAME = process.env.MONGODB_USER_NAME;
  const PASSWORD = process.env.MONGODB_USER_PASSWORD;
  const HOST_NAME = process.env.MONGODB_HOST_NAME;

  return {
    main: {
      uri: `mongodb+srv://${USER_NAME}:${PASSWORD}@${HOST_NAME}.ljyr9.mongodb.net/main`,
      connectionName: 'app_main',
      options: {
        maxPoolSize: 50,
        minPoolSize: 10,
        maxIdleTimeMS: 30000,
        socketTimeoutMS: 30000,
        serverSelectionTimeoutMS: 5000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        w: 'majority',
      },
    },
  };
});
