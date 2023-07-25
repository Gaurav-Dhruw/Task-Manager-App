import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataService } from 'src/domain/abstracts';
import { TypeOrmDataService } from './typeorm-data-service.service';
import { Comment, Notification, Reminder, Task, Team, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',

        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Team, Task, Reminder, Notification, Comment],
        synchronize: true,
      }),
    }),
  ],
  providers: [
    {
      provide: IDataService,
      useClass: TypeOrmDataService,
    },
  ],
  exports: [IDataService],
})
export class TypeOrmDataServiceModule {
  constructor() {
    // console.log(process.env);
  }
}
