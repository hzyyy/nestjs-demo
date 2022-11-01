import { PartialType } from '@nestjs/mapped-types';
import { CreateRestApiDto } from './create-rest_api.dto';

export class UpdateRestApiDto extends PartialType(CreateRestApiDto) {}
