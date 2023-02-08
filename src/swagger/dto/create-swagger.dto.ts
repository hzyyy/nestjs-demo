import { ApiProperty } from '@nestjs/swagger';

export class CreateSwaggerDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'this age',
    min: 1,
    default: 1,
  })
  age: number;
}
