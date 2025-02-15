/**
 * Entry point for the NestJS application.
 * This file sets up the application, including middleware, CORS, validation, logging, and Swagger documentation.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ResponseInterceptor, StructuredLogger } from './utils';
import { LogFormat } from '@workspace/logger';

declare const module: any;

/**
 * Bootstrap function to initialize the NestJS application.
 */
async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  /**
   * Enable Cross-Origin Resource Sharing (CORS) with specified options.
   */
  app.enableCors({
    origin: process.env.BASE_URL || 'http://localhost:8080',
    credentials: true,
  });

  /**
   * Use global validation pipes with specified options.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  /**
   * Use structured logging with specified options.
   */
  app.useLogger(
    new StructuredLogger({
      name: 'bootstrap',
      level: 'info',
      format: process.env.LOG_FORMAT as LogFormat,
      enabled: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Leaves Tracker')
    .setDescription('Api Docs for leaves tracker')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || 5002;
  const HOSTNAME = process.env.HOSTNAME || 'localhost';

  await app.listen(PORT, HOSTNAME);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  logger.log(`Server running on http://${HOSTNAME}:${PORT}`);
}
bootstrap();
