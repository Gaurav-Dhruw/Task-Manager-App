import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [],
  providers: [UserController],
})
export class UserModule {}
