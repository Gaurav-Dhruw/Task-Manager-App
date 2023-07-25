import { Module } from '@nestjs/common';
import { ITokenService } from 'src/domain/abstracts';
import { JwtService } from './jwt.service';

@Module({
  exports: [
    {
      provide: ITokenService,
      useClass: JwtService,
    },
  ],
})
export class TokenServiceModule {}
