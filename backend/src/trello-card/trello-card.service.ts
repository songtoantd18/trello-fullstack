import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrelloCard } from './trello-card.entity';
import { TrelloList } from '../trello-list/trello-list.entity';

@Injectable()
export class TrelloCardService {
  constructor(
    @InjectRepository(TrelloCard)
    private cardRepository: Repository<TrelloCard>,
    @InjectRepository(TrelloList)
    private listRepository: Repository<TrelloList>,
  ) {}

  async createCard(listId: number, title: string, position: number): Promise<TrelloCard> {
    const list = await this.listRepository.findOneBy({ id: listId });
    if (!list) throw new NotFoundException('List not found');

    const card = this.cardRepository.create({
      title,
      position,
      list,
    });
    return this.cardRepository.save(card);
  }

  async updateCardPosition(cardId: number, newListId: number, newPosition: number): Promise<TrelloCard> {
    const card = await this.cardRepository.findOne({ where: { id: cardId }, relations: ['list'] });
    if (!card) throw new NotFoundException('Card not found');

    const list = await this.listRepository.findOneBy({ id: newListId });
    if (!list) throw new NotFoundException('List not found');

    card.list = list;
    card.position = newPosition;
    
    return this.cardRepository.save(card);
  }
}
