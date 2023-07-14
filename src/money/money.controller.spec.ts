import { Test, TestingModule } from '@nestjs/testing';
import { MoneyController } from './money.controller';
import { MoneyData, MoneyService } from './money.service';
import { HttpStatus, NotFoundException } from '@nestjs/common';

describe('MoneyController', () => {
  let controller: MoneyController;
  let moneyService: MoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyController],
      providers: [MoneyService],
    }).compile();

    controller = module.get<MoneyController>(MoneyController);
    moneyService = module.get<MoneyService>(MoneyService);
  });

  describe('findAll', () => {
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
      jest.spyOn(moneyService, 'values', 'get').mockReturnValue(mockValues);
    });

    it('should return all currencies with updated values', () => {
      const response = controller.findAll();

      expect(response).toEqual({
        statusCode: HttpStatus.OK,
        data: mockValues,
      });
      expect(moneyService.values).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const mockCurrency: MoneyData = {
      id: 1,
      name: 'TST',
      current_value: 1.0,
      previous_value: 0.9,
      variation: 0.1,
      status: 'valued',
      last_update: new Date(),
    };
  
    beforeEach(() => {
      jest.spyOn(moneyService, 'findOne').mockReturnValue(mockCurrency);
    });

    it('should return the updated value of a specific currency', () => {
      const response = controller.findOne('USD');

      expect(response).toEqual({
        statusCode: HttpStatus.OK,
        data: mockCurrency,
      });
      expect(moneyService.findOne).toHaveBeenCalledWith('USD');
    });

    it('should throw NotFoundException when currency not found', () => {
      jest.spyOn(moneyService, 'findOne').mockImplementation(() => {
        throw new NotFoundException('Currency not found');
      });

      expect(() => controller.findOne('EUR')).toThrowError(NotFoundException);
      expect(moneyService.findOne).toHaveBeenCalledWith('EUR');
    });
  });

});
