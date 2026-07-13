import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloCardController } from './trello-card.controller';
import { TrelloCardService } from './trello-card.service';
import { TrelloCard } from './trello-card.entity';
import { TrelloList } from '../trello-list/trello-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloCard, TrelloList])],
  controllers: [TrelloCardController],
  providers: [TrelloCardService],
})
export class TrelloCardModule {}
