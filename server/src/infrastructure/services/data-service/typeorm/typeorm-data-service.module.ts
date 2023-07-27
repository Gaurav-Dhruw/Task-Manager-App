import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataService } from 'src/domain/abstracts';
import { TypeOrmDataService } from './typeorm-data-service.service';
import { RepositoriesModule } from './repositories';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    RepositoriesModule
  ],
  providers: [
    {
      provide: IDataService,
      useClass: TypeOrmDataService,
    },
  ],
  exports: [IDataService],
})
export class TypeOrmDataServiceModule {}
