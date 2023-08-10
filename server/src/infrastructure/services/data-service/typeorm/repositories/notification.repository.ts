import { Notification } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { INotificationRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  getById(id: string): Promise<Notification> {
    return this.notificationRepository.findOne({
      where: { id },
      relations: ['receiver'],
    });
  }

  getAll(options?: {
    user_id?: string;
    skip?: number;
    take?: number;
  }): Promise<Notification[]> {
    const { user_id } = options || {};
    return this.notificationRepository.find({
      where: {
        receiver: { id: user_id },
      },
      relations: ['receiver'],
      select: {
        id: true,
        title: true,
        content: true,
        receiver: {
          id: true,
          name: true,
          email: true,
        },
        created_at: true,
      },
      order: { created_at: 'DESC' },
      // take: take || 10,
      // skip: (skip - 1) * take,
    });
  }

  create(notification: Notification): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  createMany(notifications: Notification[]): Promise<Notification[]> {
    return this.notificationRepository.save(notifications);
  }

  update(id: string, notification: Notification): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  updateMany(notifications: Notification[]): Promise<Notification[]> {
    return this.notificationRepository.save(notifications);
  }

  async delete(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
