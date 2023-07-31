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
  getAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ relations: ['receiver'] });
  }

  getAllWhereUser(
    user_id: string,
    paginationOption?: { page: number, limit:number },
  ): Promise<Notification[]> {
    const {limit, page} = paginationOption;
    return this.notificationRepository.find({
      where: {
        receiver: { id: user_id },
      },
      relations: ['receiver'],
      take: limit || 10,
      skip: (page-1)*limit || 0,
    });
  }

  create(notification: Notification): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  update(id: string, notification: Notification): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  updateAll(notifications: Notification[]): Promise<Notification[]> {
    return this.notificationRepository.save(notifications);
  }

  async delete(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
