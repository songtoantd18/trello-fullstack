import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TrelloBoardService } from './trello-board.service';
// import { AuthGuard } from '../user/auth.guard'; // Giả sử có AuthGuard

@Controller('trello-board')
export class TrelloBoardController {
  constructor(private readonly boardService: TrelloBoardService) {}

  // @UseGuards(AuthGuard)
  @Post()
  createBoard(@Body() body: { title: string }, @Request() req) {
    // Tạm thời hardcode userId = 1 nếu chưa gắn Guard
    const userId = req.user?.id || 1;
    return this.boardService.createBoard(body.title, userId);
  }

  // @UseGuards(AuthGuard)
  @Get()
  getBoards(@Request() req) {
    const userId = req.user?.id || 1;
    return this.boardService.getBoardsByUser(userId);
  }
}
