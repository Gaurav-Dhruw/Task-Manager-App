import { Global, Module } from '@nestjs/common';
import { DataServicesModule } from './data-service/data-service.module';
import { NotificationServiceModule } from './notification-service/notification-service.module';
import { TokenServiceModule } from './token-service/token.services.module';
import { HashServiceModule } from './hash-service/hash-service.module';

@Global()
@Module({
  imports: [
    DataServicesModule,
    TokenServiceModule,
    HashServiceModule,
    NotificationServiceModule,
  ],
  exports: [
    DataServicesModule,
    TokenServiceModule,
    HashServiceModule,
    NotificationServiceModule,
  ],
})
export class ServicesModule {}
