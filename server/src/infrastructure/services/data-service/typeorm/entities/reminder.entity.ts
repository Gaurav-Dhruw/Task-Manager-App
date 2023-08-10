import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task, User } from './';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User)
  @JoinTable()
  receivers: User[];

  @ManyToOne(() => Task, (task) => task.reminders, { onDelete: 'CASCADE' })
  task: Task;

  @Column()
  scheduled_for: Date;
}
