import { Notification } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { INotificationRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(@InjectRepository(Notification) NotificationRepository: Repository<Notification>) {}

  getById(id: string): Promise<Notification> {
    return;
  }
  getAll(): Promise<Notification[]> {
    return;
  }
  create(item: Notification): Promise<Notification> {
    return;
  }
  update(id: string, item: Notification): Promise<Notification> {
    return;
  }
  delete(id: string): void {}
}
