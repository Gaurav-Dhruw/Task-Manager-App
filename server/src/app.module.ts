import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicesModule } from './infrastructure/services/services.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './presentation/common/middlewares/auth.middleware';
import { ControllersModule } from './presentation/modules/controllers.module';
import { UseCasesModule } from './application/use-cases/use-cases.module';
import { SchedulerModule } from './infrastructure/jobs/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServicesModule,
    UseCasesModule,
    ControllersModule,
    SchedulerModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth').forRoutes('user', 'team');
  }
}
