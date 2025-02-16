/**
 * Entry point for the NestJS application.
 * This file sets up the application, including middleware, CORS, validation, logging, and Swagger documentation.
 */

import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { type LogFormat } from '@workspace/logger';
import { ResponseInterceptor } from 'utils/interceptors';
import { StructuredLogger } from 'utils/logger';
import { AllExceptionsFilter, HttpExceptionFilter } from 'utils/filters';
import { AppModule } from './app.module';

declare const module: any;

/**
 * Bootstrap function to initialize the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 1. Use structured logging with specified options.
   */
  app.useLogger(new StructuredLogger({ level: 'info', format: process.env.LOG_FORMAT as LogFormat }));

  const logger = new Logger('EntryPoint');

  /**
   * 2. Security middleware
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
   * Enable Cross-Origin Resource Sharing (CORS) with specified options.

  /**
   * 4. Enable Cross-Origin Resource Sharing (CORS) with specified options.
   */
  app.enableCors({
    origin: process.env.BASE_URL as string,
    credentials: true,
  });

  /**
   * 5. Global interceptors for handling success and error responses
   */
  app.useGlobalInterceptors(new ResponseInterceptor());

  /**
   * 6. Global filter for handling unhandled exceptions
   */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    // AllExceptionsFilter handles all uncaught exceptions
    new AllExceptionsFilter(httpAdapter),

    // HttpExceptionFilter handles HTTP exceptions
    new HttpExceptionFilter(),
  );

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
