import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TrelloList } from '../trello-list/trello-list.entity';

@Entity('trello_card')
export class TrelloCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  cover_image: string;

  @Column({ nullable: true })
  deadline: Date;

  // Vị trí của Card trong List (để xử lý kéo thả)
  @Column({ default: 0 })
  position: number;

  // Quan hệ 1 List -> Nhiều Card
  @ManyToOne(() => TrelloList, list => list.cards, { onDelete: 'CASCADE' })
  list: TrelloList;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
