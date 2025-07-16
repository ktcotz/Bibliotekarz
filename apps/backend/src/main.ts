import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { setupSwagger } from './swagger/swagger.config';
import { logger } from './logger/logger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,

      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app);

  await app.listen(env.PORT);
  Logger.log(`Server running on http://localhost:${env.PORT}`);
}
bootstrap();
