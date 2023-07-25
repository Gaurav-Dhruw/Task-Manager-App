import { Reminder, Team } from "./";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique:true
  })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    nullable:true
  })
  profile_pic: string;

  @ManyToMany(() => Team,(team)=>team.members,{
    nullable:true
  })
  @JoinTable({})
  teams?: Team[];

  @ManyToOne(() => Reminder, (reminder) => reminder.receivers,{
    nullable:true,
  })
  @JoinTable()
  reminders?: Reminder[];
}