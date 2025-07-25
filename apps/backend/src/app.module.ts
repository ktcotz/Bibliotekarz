import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
