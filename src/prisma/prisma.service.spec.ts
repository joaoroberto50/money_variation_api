import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let mockApp: Partial<INestApplication>;
  let mockOn: jest.Mock;

  beforeEach(async () => {
    mockApp = {
      close: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should connect to the database on module initialization', async () => {
    const connectSpy = jest.spyOn(prismaService, '$connect');

    await prismaService.onModuleInit();

    expect(connectSpy).toHaveBeenCalled();
  });

  it('should enable shutdown hooks with correct application close', () => {
    const onSpy = jest.spyOn(prismaService, '$on');

    prismaService.enableShutdownHooks(mockApp as INestApplication);

    expect(onSpy).toHaveBeenCalledWith('beforeExit', expect.any(Function));

    const eventHandler = onSpy.mock.calls[0][1];

    const mockBeforeExitHandler = jest.fn();
    eventHandler(mockBeforeExitHandler);

    expect(mockApp.close).toHaveBeenCalled();
  });
});
