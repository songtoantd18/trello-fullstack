import { Test, TestingModule } from '@nestjs/testing';
import { TrelloListController } from './trello-list.controller';

describe('TrelloListController', () => {
  let controller: TrelloListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrelloListController],
    }).compile();

    controller = module.get<TrelloListController>(TrelloListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
