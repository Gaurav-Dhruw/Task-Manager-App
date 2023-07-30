import { Reminder, Team } from './';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  profile_pic: string;

  @ManyToMany(() => Team, (team) => team.members, {
    nullable: true,
  })
  teams?: Team[];

  @ManyToOne(() => Reminder, (reminder) => reminder.receivers, {
    nullable: true,
  })
  reminders?: Reminder[];
}
