import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";

export class CreatePipeDtoDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: '不能少于5个字符和不能大于10个字符'
  })
  name: string;

  @IsNumber()
  age: number;
}
