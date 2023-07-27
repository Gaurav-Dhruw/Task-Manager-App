import { Module } from '@nestjs/common';
import { ITokenService } from 'src/domain/abstracts';
import { JwtService } from './jwt.service';

@Module({
  providers: [
    {
      provide: ITokenService,
      useClass: JwtService,
    },
  ],
  exports: [ITokenService],
})
export class TokenServiceModule {}
