import { Test, TestingModule } from '@nestjs/testing';
import { PipeDtoController } from './pipe-dto.controller';
import { PipeDtoService } from './pipe-dto.service';

describe('PipeDtoController', () => {
  let controller: PipeDtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipeDtoController],
      providers: [PipeDtoService],
    }).compile();

    controller = module.get<PipeDtoController>(PipeDtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
