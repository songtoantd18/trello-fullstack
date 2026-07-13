import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrelloBoard } from './trello-board.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TrelloBoardService {
  constructor(
    @InjectRepository(TrelloBoard)
    private boardRepository: Repository<TrelloBoard>,
  ) {}

  async createBoard(title: string, userId: number): Promise<TrelloBoard> {
    const board = this.boardRepository.create({
      title,
      user: { id: userId } as User,
    });
    return this.boardRepository.save(board);
  }

  async getBoardsByUser(userId: number): Promise<TrelloBoard[]> {
    return this.boardRepository.find({
      where: { user: { id: userId } },
      relations: ['lists', 'lists.cards'],
    });
  }
}
