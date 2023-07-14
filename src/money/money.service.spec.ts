import { Test, TestingModule } from '@nestjs/testing';
import { MoneyService, MoneyData } from './money.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('VariationService', () => {
  let moneyService: MoneyService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoneyService,
        {
          provide: PrismaService,
          useValue: {
            money: {
              findMany: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    moneyService = module.get<MoneyService>(MoneyService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findOne', () => {
    const mockValues: MoneyData[] = [
      {
        id: 1,
        name: 'TST',
        current_value: 1.0,
        previous_value: 0.9,
        variation: 0.1,
        status: 'valued',
        last_update: new Date(),
      },
    ];

    beforeEach(() => {
      jest.spyOn(prismaService.money, 'findMany').mockResolvedValue(mockValues);
    });

    it('should return the specific currency when found', async () => {
      const result = await moneyService.findOne('TST');

      expect(result).toEqual(mockValues[0]);
      expect(prismaService.money.findMany).toHaveBeenCalled();
    });

    it('should throw NotFoundException when currency not found', async () => {
      jest.spyOn(prismaService.money, 'findMany').mockResolvedValue([]);

      await expect(moneyService.findOne('EUR')).rejects.toThrowError(NotFoundException);
      expect(prismaService.money.findMany).toHaveBeenCalled();
    });
  });
});
