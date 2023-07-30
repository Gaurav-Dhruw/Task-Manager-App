import { Priority, Status } from 'src/domain/types';
import { Reminder, Team, User, Comment } from './';
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

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column({ nullable: true })
  deadline?: Date;

  @Column({ type: 'enum', enum: Status, default: Status.Unfinished })
  status: Status;

  @Column({ type: 'enum', enum: Priority, nullable: true })
  priority?: Priority;

  @ManyToOne(() => User)
  @JoinColumn()
  created_by: User;

  @ManyToMany(() => User)
  @JoinTable()
  assigned_to: User[];

  @ManyToOne(() => Team, (team) => team.tasks, {
    nullable: true,
  })
  team?: Team;

  @OneToMany(() => Comment, (comment) => comment.task, { nullable: true })
  comments?: Comment[];

  @OneToOne(() => Reminder, (reminder) => reminder.task, {
    nullable: true,
  })
  @JoinColumn()
  reminder?: Reminder;
}
