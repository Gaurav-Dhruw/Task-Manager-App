import { Module } from '@nestjs/common';
import { IHashService } from 'src/domain/abstracts';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [
    {
      provide: IHashService,
      useClass: BcryptService,
    },
  ],

  exports: [IHashService],
})
export class HashServiceModule {}
