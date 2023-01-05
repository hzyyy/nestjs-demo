import { PartialType } from '@nestjs/mapped-types';
import { CreatePipeDtoDto } from './create-pipe-dto.dto';

export class UpdatePipeDtoDto extends PartialType(CreatePipeDtoDto) {}
