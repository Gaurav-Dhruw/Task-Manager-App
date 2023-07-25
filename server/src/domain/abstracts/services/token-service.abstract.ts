import { User } from "src/domain/entities";

export abstract class ITokenService {
  abstract generateToken(data: User): string;
  abstract verifyToken(token: string): boolean;
}