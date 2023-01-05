import { HttpException, HttpStatus } from '@nestjs/common';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * 自定义校验逻辑，也可以使用main.ts 中的nestjs 提供的全局管道pipe useGlobalPipes
 */
@Injectable()
export class PipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // plainToInstance(): 实例化一个类，从而获得此类的制定的规则, 并传入values，进行反射
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
