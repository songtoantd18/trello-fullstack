import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloBoardController } from './trello-board.controller';
import { TrelloBoardService } from './trello-board.service';
import { TrelloBoard } from './trello-board.entity';
import { TrelloGateway } from './trello.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloBoard])],
  controllers: [TrelloBoardController],
  providers: [TrelloBoardService, TrelloGateway],
})
export class TrelloBoardModule {}
