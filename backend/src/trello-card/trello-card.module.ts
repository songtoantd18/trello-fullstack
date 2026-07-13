import { Module } from '@nestjs/common';
import { TrelloCardController } from './trello-card.controller';
import { TrelloCardService } from './trello-card.service';

@Module({
  controllers: [TrelloCardController],
  providers: [TrelloCardService]
})
export class TrelloCardModule {}
