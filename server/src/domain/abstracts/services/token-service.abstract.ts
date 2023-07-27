import { User } from "src/domain/entities";

export abstract class ITokenService {
  abstract generateToken(data: Partial<User>): string;
  abstract decodeToken(token: string): Partial<User> | undefined;
}