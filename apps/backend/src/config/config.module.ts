import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';

import { envSchema } from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      load: [
        () => {
          const env = dotenv.config().parsed ?? {};

          const result = envSchema.safeParse(env);

          if (!result.success) {
            console.error('❌ Invalid environment variables:');

            console.error(result.error.message);

            process.exit(1);
          }

          return result.data;
        },
      ],
    }),
  ],
})
export class AppConfigModule {}
