import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task, User } from './';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  team_name: string;

  @Column({
    nullable:true
  })
  display_pic?: string;

  @ManyToMany(() => User)
  @JoinTable()
  admins: User[];

  @ManyToMany(() => User, (user)=>user.teams)
  @JoinTable()
  members: User[];

  @OneToMany(() => Task, (task) => task.team,{
    nullable:true
  })
  tasks?: Task[];
}
