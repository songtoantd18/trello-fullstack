import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { TrelloList } from '../trello-list/trello-list.entity';

@Entity('trello_board')
export class TrelloBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // Quan hệ 1 User -> Nhiều Board
  @ManyToOne(() => User, user => user.id)
  user: User;

  // Quan hệ 1 Board -> Nhiều List
  @OneToMany(() => TrelloList, list => list.board)
  lists: TrelloList[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
