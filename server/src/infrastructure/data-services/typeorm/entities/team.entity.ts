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

  @Column()
  display_pic: string;

  @ManyToMany(() => User)
  @JoinTable()
  admins: User[];

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @OneToMany(() => Task, (task) => task.team)
  tasks: Task[];
}
