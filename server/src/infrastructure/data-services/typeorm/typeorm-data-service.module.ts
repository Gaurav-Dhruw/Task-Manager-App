import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataService } from 'src/application/abstracts';
import { TypeOrmDataService } from './typeorm-data-service.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
      port: 5432,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  providers: [{
    provide:IDataService,
    useClass:TypeOrmDataService
  }],
  exports:[IDataService]
})
export class TypeOrmDataServiceModule {}
