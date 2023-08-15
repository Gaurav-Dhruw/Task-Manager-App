import { Request } from 'express';
import { ITokenPayload } from 'src/domain/types';

export interface CustomRequest extends Request {
  user: ITokenPayload;
}
