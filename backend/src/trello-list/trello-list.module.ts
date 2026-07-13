import { Module } from '@nestjs/common';
import { TrelloListController } from './trello-list.controller';
import { TrelloListService } from './trello-list.service';

@Module({
  controllers: [TrelloListController],
  providers: [TrelloListService]
})
export class TrelloListModule {}
