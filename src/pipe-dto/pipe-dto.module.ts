import { Module } from '@nestjs/common';
import { PipeDtoService } from './pipe-dto.service';
import { PipeDtoController } from './pipe-dto.controller';

@Module({
  controllers: [PipeDtoController],
  providers: [PipeDtoService]
})
export class PipeDtoModule {}
