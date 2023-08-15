export class Otp {
  id: string;
  email: string;
  code: string;
  expiration_time: Date;

  constructor(options?: Partial<Otp>) {
    Object.assign(this, options);
  }
}
