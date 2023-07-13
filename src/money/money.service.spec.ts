import { Test, TestingModule } from '@nestjs/testing';
import { MoneyService } from './money.service';

describe('VariationService', () => {
  let service: MoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyService],
    }).compile();

    service = module.get<MoneyService>(MoneyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
