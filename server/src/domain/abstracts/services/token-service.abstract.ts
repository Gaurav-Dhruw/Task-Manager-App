import { User } from "src/domain/entities";

export abstract class ITokenService {
  abstract generateToken(data: User): string;
  abstract decodeToken(token: string): User | undefined;
}