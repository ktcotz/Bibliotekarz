import { INestApplication } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_CONFIG } from './swagger.constants';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()

    .setTitle(SWAGGER_CONFIG.title)

    .setDescription(SWAGGER_CONFIG.description)

    .setVersion(SWAGGER_CONFIG.version)

    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },

      SWAGGER_CONFIG.bearerAuthName,
    )

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_CONFIG.path, app, document);
}
