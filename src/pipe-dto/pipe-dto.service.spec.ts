import { Test, TestingModule } from '@nestjs/testing';
import { PipeDtoService } from './pipe-dto.service';

describe('PipeDtoService', () => {
  let service: PipeDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipeDtoService],
    }).compile();

    service = module.get<PipeDtoService>(PipeDtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
