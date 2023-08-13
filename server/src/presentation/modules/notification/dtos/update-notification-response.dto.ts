import { Notification } from 'src/domain/entities';

export class UpdateNotificationResponseDto
  implements Omit<Notification, 'receiver'>
{
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: Date;

  constructor(options?: Partial<Notification>) {
    this.id = options?.id ?? this.id;
    this.title = options?.title ?? this.title;
    this.content = options?.content ?? this.content;
    this.is_read = options?.is_read ?? this.is_read;
    this.created_at = options?.created_at ?? this.created_at;
  }
}
