import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ITokenService } from 'src/domain/abstracts';
import { CustomRequest } from '../types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: ITokenService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      if (!token) throw new UnauthorizedException('Access Token Not Present');
      // console.log(token);
      const user = this.tokenService.decodeToken(token);
      // console.log(user);
      if (!user) throw new UnauthorizedException('Invalid Token');

      console.log('Auth Hit');

      req.user = user;
      next();
    } catch (error) {
      console.log('Auth Failed', error.message);
      return res.sendStatus(401);
    }
  }
}
