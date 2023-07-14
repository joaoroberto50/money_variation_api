import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    const mockData = 'Hello, World!';

    beforeEach(() => {
      jest.spyOn(appService, 'getHello').mockReturnValue(mockData);
    });

    it('should return initial application information', () => {
      const response = appController.getHello();

      expect(response).toEqual({
        statusStatus: HttpStatus.OK,
        data: mockData,
      });
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});
