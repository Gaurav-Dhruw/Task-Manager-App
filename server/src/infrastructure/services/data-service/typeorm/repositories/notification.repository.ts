import { Notification } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { INotificationRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryHelper } from './repository.helper';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly helper: RepositoryHelper,
  ) {}

  getById(id: string): Promise<Notification> {
    return this.notificationRepository.findOne({
      where: { id },
      relations: ['receiver'],
    });
  }

  getAll(options?: {
    where?: { user_id?: string; is_read?: boolean };
    sort?: { created_at?: 'desc' | 'asc' };
    pagination?: { page: number; limit: number };
  }): Promise<Notification[]> {
    const { where, sort, pagination } = options || {};
    const { user_id, is_read } = where || {};
    const { created_at } = sort || {};
    const { page = 1, limit = 10 } = pagination || {};

    const queryOptions = {
      where: {
        user_id: { receiver: { id: user_id } },
        is_read: { is_read },
      },
      sort: {
        created_at,
      },
      pagination: {
        take: limit,
        skip: (page - 1) * limit,
      },
    };

    const query = this.helper.buildQuery(options, queryOptions);

    return this.notificationRepository.find({
      ...query,
      relations: ['receiver'],
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
