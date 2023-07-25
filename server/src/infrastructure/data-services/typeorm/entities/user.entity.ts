import { Reminder, Team } from "./";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  profile_pic: string;

  @ManyToMany(() => Team)
  @JoinTable()
  teams?: Team[];

  @ManyToOne(() => Reminder, (reminder) => reminder.receivers)
  @JoinTable()
  reminders?: Reminder[];
}