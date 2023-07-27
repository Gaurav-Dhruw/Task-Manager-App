import { Injectable } from '@nestjs/common';
import { IHashService } from 'src/domain/abstracts';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IHashService {
  bcrypt: typeof bcrypt;
  salt: number;

  constructor() {
    this.bcrypt = bcrypt;
    this.salt = 10;
  }

  hash(data: string): string {
    return bcrypt.hashSync(data, this.salt);
  }

  verify(data1: string, data2: string): boolean {
    return bcrypt.compareSync(data1, data2);
  }
}
