import { Module } from '@nestjs/common';
import { TypeOrmDataServiceModule } from './typeorm/typeorm-data-service.module';

@Module({
  imports: [TypeOrmDataServiceModule],
  exports: [TypeOrmDataServiceModule],
})
export class DataServicesModule {}
