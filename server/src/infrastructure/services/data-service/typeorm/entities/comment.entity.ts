import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User, Task } from './';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({
    default: () => 'NOW()',
  })
  created_at: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Task)
  task: Task;
}
