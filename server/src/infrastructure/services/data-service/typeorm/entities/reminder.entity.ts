import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task, User } from './';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (user) => user.reminders)
  receivers: User[];

  @OneToOne(() => Task, (task) => task.reminder)
  task: Task;

  @Column()
  scheduled_for: Date;
}
