import * as dotenv from 'dotenv';
import { envSchema } from './env.schema';

const parsed = dotenv.config().parsed ?? {};

const result = envSchema.safeParse(parsed);

if (!result.success) {
  console.error('❌ Invalid environment variables:');
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;
