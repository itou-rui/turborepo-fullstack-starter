/**
 * Entry point for the NestJS application.
 * This file sets up the application, including middleware, CORS, validation, logging, and Swagger documentation.
 */

import { Logger, ValidationPipe, type ValidationError } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { type LogFormat } from '@workspace/logger';
import { StructuredLogger } from 'utils/logger';
import { AllExceptionsFilter } from 'utils/filters';
import { GlobalValidationException } from 'utils/exceptions';
import { databaseConfig } from 'config/database.config';
import { AppModule } from './app.module';

declare const module: any;

/**
 * Bootstrap function to initialize the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Use structured logging with specified options.
   */
  app.useLogger(new StructuredLogger({ level: 'info', format: process.env.LOG_FORMAT as LogFormat }));

  const logger = new Logger('EntryPoint');

  /**
   * Security middleware
   */
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          scriptSrc: ["'self'"],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );

  /**
   * Cookie middleware
   */
  app.use(cookieParser());

  /**
   * Session middleware
   */
  app.use(
    session({
      secret: process.env.JWT_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      },
      store: MongoStore.create({
        mongoUrl: databaseConfig().main.uri,
        dbName: 'store',
        mongoOptions: databaseConfig().main.options,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Set up global validation pipes to handle request validation.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      /**
       * Factory function to create a GlobalValidationException based on validation errors.
       * @throws GlobalValidationException - Throws an exception with detailed error information.
       */
      exceptionFactory(errors) {
        const formatError = (error: ValidationError) => ({
          code: `${error.property.toUpperCase()}_VALIDATION_ERROR`,
          message: Object.values(error.constraints!).join(', '),
          property: error.property,
          value: error.value,
        });

        if (errors.length === 1) {
          throw new GlobalValidationException(formatError(errors[0]));
        }

        throw new GlobalValidationException({
          _errors: errors.map(formatError),
        });
      },
    }),
  );

  /**
   * Enable Cross-Origin Resource Sharing (CORS) with specified options.
   */
  app.enableCors({
    origin: [process.env.BASE_URL as string],
    credentials: true,
  });

  /**
   * Global filter for handling unhandled exceptions
   */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  /**
   * Swagger documentation setup
   */
  const config = new DocumentBuilder()
    .setTitle('Leaves Tracker')
    .setDescription('Api Docs for leaves tracker')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT as string;
  const HOSTNAME = process.env.HOSTNAME as string;

  await app.listen(PORT, HOSTNAME);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  logger.log(`Server running on http://${HOSTNAME}:${PORT}`);
  logger.log(`Swagger documentation available at http://${HOSTNAME}:${PORT}/docs`);
}

bootstrap();
