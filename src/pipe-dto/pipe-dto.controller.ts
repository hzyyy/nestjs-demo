import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PipeDtoService } from './pipe-dto.service';
import { CreatePipeDtoDto } from './dto/create-pipe-dto.dto';
import { UpdatePipeDtoDto } from './dto/update-pipe-dto.dto';
import { PipePipe } from './pipe/pipe.pipe'

@Controller('pipe-dto')
export class PipeDtoController {
  constructor(private readonly pipeDtoService: PipeDtoService) {}

  @Post()
  /**
   * 增加管道 PipePipe，负责校验数据是否符合规则和相关逻辑;
   * 也可以使用main.ts 中的nestjs 提供的全局管道pipe useGlobalPipes，全局优先
   * 增加DTO 验证 CreatePipeDtoDto，负责提供校验的规则，以及数据类型
   * 两者相互配合，组成强大的类似于form 表单验证，摆脱 if-else 的恐惧。
   */
  create(@Body(PipePipe) createPipeDtoDto: CreatePipeDtoDto) {
    return this.pipeDtoService.create(createPipeDtoDto);
  }

  @Get()
  findAll() {
    return this.pipeDtoService.findAll();
  }

  @Get(':id')
  /**
   * 对传进来的参数值做类型转换，另外，nestjs 也提供了其它几个的类型转换的管道
   * ValidationPipe
      ParseIntPipe
      ParseFloatPipe
      ParseBoolPipe
      ParseArrayPipe
      ParseUUIDPipe
      ParseEnumPipe
      DefaultValuePipe
   */
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pipeDtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipeDtoDto: UpdatePipeDtoDto) {
    return this.pipeDtoService.update(+id, updatePipeDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipeDtoService.remove(+id);
  }
}
