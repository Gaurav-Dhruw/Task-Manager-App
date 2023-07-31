import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @ManyToOne(() => Task, (task) => task.reminders)
  task: Task;

  @Column()
  scheduled_for: Date;
}
