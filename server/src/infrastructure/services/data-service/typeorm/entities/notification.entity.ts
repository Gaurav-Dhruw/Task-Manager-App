import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  receiver: User;

  @Column()
  content: string;

  @Column({
    default: false,
  })
  is_read: boolean;

  @Column({
    default: () => 'NOW()',
  })
  created_at: Date;
}
