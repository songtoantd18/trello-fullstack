import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TrelloListService } from './trello-list.service';

@Controller('trello-list')
export class TrelloListController {
  constructor(private readonly listService: TrelloListService) {}

  @Post()
  createList(@Body() body: { boardId: number; title: string; position: number }) {
    return this.listService.createList(body.boardId, body.title, body.position);
  }

  @Get('board/:boardId')
  getListsByBoard(@Param('boardId') boardId: string) {
    return this.listService.getListsByBoard(+boardId);
  }
}
