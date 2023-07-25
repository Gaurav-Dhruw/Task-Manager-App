import { Module } from '@nestjs/common';
import { DataServicesModule } from './infrastructure/data-services/data-service.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DataServicesModule],
  providers: [],
})
export class AppModule {}
