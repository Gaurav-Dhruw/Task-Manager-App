import { Injectable } from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ITokenService } from 'src/domain/abstracts';
import { User } from 'src/domain/entities';

@Injectable()
export class JwtService implements ITokenService {
  jwt: typeof jwt;
  secretKey: string;

  constructor() {
    this.jwt = jwt;
    this.secretKey = process.env.SECRET_TOKEN_KEY;
  }

  generateToken(data: User): string {
    const payload = {
      id: data.id,
      email: data.email,
    };
    return jwt.sign(payload, this.secretKey);
  }

  decodeToken(token: string): User | undefined {
    const decoded = jwt.verify(token, this.secretKey);
    if(this.isJwtPayload(decoded)){
        const user = new User();
        user.id = decoded?.id;
        user.email = decoded?.email;
        return user;
    }
  }

  isJwtPayload(data:string | JwtPayload): data is JwtPayload{
    return (data as JwtPayload).iat === undefined;
  }
}
