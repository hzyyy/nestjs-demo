import { Injectable } from '@nestjs/common';
import { CreatePipeDtoDto } from './dto/create-pipe-dto.dto';
import { UpdatePipeDtoDto } from './dto/update-pipe-dto.dto';

@Injectable()
export class PipeDtoService {
  create(createPipeDtoDto: CreatePipeDtoDto) {
    return 'This action adds a new pipeDto';
  }

  findAll() {
    return `This action returns all pipeDto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pipeDto`;
  }

  update(id: number, updatePipeDtoDto: UpdatePipeDtoDto) {
    return `This action updates a #${id} pipeDto`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipeDto`;
  }
}
