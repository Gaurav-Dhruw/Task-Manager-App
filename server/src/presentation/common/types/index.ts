import { Request } from "express";
import { User } from "src/domain/entities";

export interface CustomRequest extends Request{
    user:Pick<User, 'id' | 'email'>
}