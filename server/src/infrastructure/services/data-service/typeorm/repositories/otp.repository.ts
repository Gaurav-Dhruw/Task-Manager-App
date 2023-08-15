import { InjectRepository } from '@nestjs/typeorm';
import { IOtpRepository } from 'src/domain/abstracts/repositories/otp-repository.abstract';
import { Otp } from '../entities';
import { Repository } from 'typeorm';
import { RepositoryHelper } from './repository.helper';

export class OtpRepository implements IOtpRepository {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
  ) {}

  create(otp: Otp): Promise<Otp> {
    return this.otpRepository.save(otp);
  }

  get(options: { where: { email: string; code: string } }): Promise<Otp> {
    const {
      where: { email, code },
    } = options;

    return this.otpRepository.findOne({
      where: {
        email,
        code,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.otpRepository.delete(id);
  }
}
