import { Otp } from 'src/domain/entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IOtpRepository
  implements Omit<IGenericRepository<Otp>, 'update' | 'getById' | 'getAll'>
{
  abstract get(options?: { email?: string; code?: string }): Promise<Otp>;
  abstract create(item: Otp): Promise<Otp>;
  abstract delete(id: string): Promise<void>;
}
