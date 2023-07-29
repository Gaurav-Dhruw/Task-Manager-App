import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
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

  generateToken(data: Pick<User, 'id' | 'email'>): string {
    const payload = {
      id: data.id,
      email: data.email,
    };
    
    return this.jwt.sign(payload, this.secretKey);
  }

  decodeToken(token: string): Pick<User,'id' | 'email'> | undefined {
    try{

      const decoded = this.jwt.verify(token, this.secretKey);
      
      if (this.isJwtPayload(decoded)) {
        const user = new User();
        user.id = decoded.id;
        user.email = decoded.email;
        
        return user;
      }
    }catch{
      return;
    }
  }

  isJwtPayload(data: string | jwt.JwtPayload): data is jwt.JwtPayload {
    return (data as jwt.JwtPayload).iat !== undefined;
  }
}
