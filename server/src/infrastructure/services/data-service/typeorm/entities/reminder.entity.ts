import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task, User } from './';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(()=>User)
  @JoinColumn()
  created_by: User;

  @OneToMany(() => User, (user) => user.reminders)
  receivers: User[];

  @OneToOne(() => Task, (task) => task.reminder)
  task: Task;

  @Column()
  scheduled_for: Date;
}
