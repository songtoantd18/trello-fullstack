import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { TrelloBoard } from '../trello-board/trello-board.entity';
import { TrelloCard } from '../trello-card/trello-card.entity';

@Entity('trello_list')
export class TrelloList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // Vị trí của List trong Board (để xử lý kéo thả List)
  @Column({ default: 0 })
  position: number;

  // Quan hệ 1 Board -> Nhiều List
  @ManyToOne(() => TrelloBoard, board => board.lists, { onDelete: 'CASCADE' })
  board: TrelloBoard;

  // Quan hệ 1 List -> Nhiều Card
  @OneToMany(() => TrelloCard, card => card.list)
  cards: TrelloCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
