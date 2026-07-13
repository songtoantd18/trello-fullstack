import { Test, TestingModule } from '@nestjs/testing';
import { TrelloCardService } from './trello-card.service';

describe('TrelloCardService', () => {
  let service: TrelloCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrelloCardService],
    }).compile();

    service = module.get<TrelloCardService>(TrelloCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
