import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrelloList } from './trello-list.entity';
import { TrelloBoard } from '../trello-board/trello-board.entity';

@Injectable()
export class TrelloListService {
  constructor(
    @InjectRepository(TrelloList)
    private listRepository: Repository<TrelloList>,
    @InjectRepository(TrelloBoard)
    private boardRepository: Repository<TrelloBoard>,
  ) {}

  async createList(boardId: number, title: string, position: number): Promise<TrelloList> {
    const board = await this.boardRepository.findOneBy({ id: boardId });
    if (!board) throw new NotFoundException('Board not found');

    const list = this.listRepository.create({
      title,
      position,
      board,
    });
    return this.listRepository.save(list);
  }

  async getListsByBoard(boardId: number): Promise<TrelloList[]> {
    return this.listRepository.find({
      where: { board: { id: boardId } },
      relations: ['cards'],
      order: {
        position: 'ASC',
        cards: {
          position: 'ASC'
        }
      },
    });
  }
}
