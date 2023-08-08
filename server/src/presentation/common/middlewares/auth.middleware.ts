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
  constructor(
    private readonly tokenService: ITokenService,
    // private readonly dataService: IDataService,
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      if (!token) throw new UnauthorizedException('Access Token Not Present');
      const requestUser = this.tokenService.decodeToken(token);
      if (!requestUser || !requestUser.id)
        throw new UnauthorizedException('Invalid Token');

      // console.log('Auth Hit');

      // const user = await this.dataService.user.getById(requestUser.id);

      // if (!user) throw new UnauthorizedException('User Unauthorized');

      req.user = requestUser;
      next();
    } catch (error) {
      // console.log('Auth Failed: ', error.message);
      return res.status(error.status).json(error.response);
    }
  }
}
