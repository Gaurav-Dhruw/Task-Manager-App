import { Request } from "express";
import { TokenPayload } from "src/domain/types";


export interface CustomRequest extends Request{
    user:TokenPayload
}

