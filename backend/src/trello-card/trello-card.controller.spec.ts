import { Test, TestingModule } from '@nestjs/testing';
import { TrelloCardController } from './trello-card.controller';

describe('TrelloCardController', () => {
  let controller: TrelloCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrelloCardController],
    }).compile();

    controller = module.get<TrelloCardController>(TrelloCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
