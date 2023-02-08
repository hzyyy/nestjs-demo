import { ApiProperty } from '@nestjs/swagger';

export class CreateSwaggerDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'this age',
    minItems: 10,
    default: 21,
  })
  age: number;
}
