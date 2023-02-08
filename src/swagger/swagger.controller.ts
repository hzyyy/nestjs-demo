import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { CreateSwaggerDto } from './dto/create-swagger.dto';
import { UpdateSwaggerDto } from './dto/update-swagger.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('swagger')
@ApiTags('这是swagger 的分类')
@ApiBearerAuth()    // 允许swagger 请求时，携带指定Authorization
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Post()
  create(@Body() createSwaggerDto: CreateSwaggerDto) {
    return this.swaggerService.create(createSwaggerDto);
  }

  @Get()
  @ApiOperation({summary: 'this is swagger', description: 'this is swagger description'})
  findAll() {
    return this.swaggerService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', description: 'user id', required: true})
  @ApiQuery({name: 'page', description: '这是分页信息', required: true})
  // 返回信息的描述
  @ApiResponse({status: 200, description: 'ApiResponse1'})
  @ApiResponse({status: 300, description: 'ApiResponse2'})
  findOne(@Param('id') id: string) {
    return this.swaggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwaggerDto: UpdateSwaggerDto) {
    return this.swaggerService.update(+id, updateSwaggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swaggerService.remove(+id);
  }
}
