import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloListController } from './trello-list.controller';
import { TrelloListService } from './trello-list.service';
import { TrelloList } from './trello-list.entity';
import { TrelloBoard } from '../trello-board/trello-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloList, TrelloBoard])],
  controllers: [TrelloListController],
  providers: [TrelloListService],
})
export class TrelloListModule {}
