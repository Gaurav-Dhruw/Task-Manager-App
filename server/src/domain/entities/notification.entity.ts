import { User } from './';

export class Notification {
  id: string;
  title: string;
  receiver: User;
  content: string;
  is_read: boolean;
  created_at: Date;

  constructor(data?: Partial<Notification>) {
    Object.assign(this, data);
  }
}
