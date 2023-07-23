import { Module } from '@nestjs/common';
import { DataServicesModule } from './infrastructure/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [],
})
export class AppModule {}
