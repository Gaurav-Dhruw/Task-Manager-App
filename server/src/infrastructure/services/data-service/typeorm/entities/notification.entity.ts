import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  receiver: User;

  @Column()
  content: string;

  @Column({
    default: false,
  })
  is_read: boolean;
}
