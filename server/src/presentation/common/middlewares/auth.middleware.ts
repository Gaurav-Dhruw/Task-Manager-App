import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { IDataService, ITokenService } from 'src/domain/abstracts';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly dataService: IDataService,
    private readonly tokenService: ITokenService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers?.authorization?.split('')[1];
      if (!token) throw new UnauthorizedException('Access Token Not Present');

      const user = this.tokenService.decodeToken(token);
      if (!user) throw new UnauthorizedException('Invalid Token');
      console.log('Auth Hit');
      this.dataService.user.getById(user.id);
      next();
    } catch (error) {
      console.log('Auth Failed', error);
      return res.sendStatus(401);
    }
  }
}
