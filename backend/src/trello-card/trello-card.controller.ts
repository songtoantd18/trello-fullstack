import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { TrelloCardService } from './trello-card.service';

@Controller('trello-card')
export class TrelloCardController {
  constructor(private readonly cardService: TrelloCardService) {}

  @Post()
  createCard(@Body() body: { listId: number; title: string; position: number }) {
    return this.cardService.createCard(body.listId, body.title, body.position);
  }

  @Put(':id/position')
  updatePosition(
    @Param('id') id: string,
    @Body() body: { newListId: number; newPosition: number },
  ) {
    return this.cardService.updateCardPosition(+id, body.newListId, body.newPosition);
  }
}
