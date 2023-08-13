import { Otp } from 'src/domain/entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IOtpRepository
  implements Omit<IGenericRepository<Otp>, 'update' | 'getById' | 'getAll'>
{
  abstract get(options: {
    where: { email: string; code: string };
  }): Promise<Otp>;

  abstract create(otp: Otp): Promise<Otp>;
  abstract delete(otp_id: string): Promise<void>;
}
