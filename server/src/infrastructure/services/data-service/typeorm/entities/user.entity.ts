import { Reminder, Task, Team } from './';
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

  @Column({ select: false })
  password: string;

  @Column({
    nullable: true,
  })
  profile_pic?: string;

  @Column({
    default:false,
  })
  is_verified: boolean;

  @ManyToMany(() => Team, (team) => team.members, {
    nullable: true,
  })
  teams?: Team[];

  @ManyToMany(() => Task, (task) => task.assigned_to, { nullable: true })
  tasks?: Task[];
}
