import { Module } from '@nestjs/common';
import { User1Service } from './user_1.service';
import { User1Controller } from './user_1.controller';

@Module({
  controllers: [User1Controller],
  providers: [User1Service],
  exports: [User1Service], // 将此模块导出；能够被其它模块调用到此模块的service 方法
})
export class User1Module {}
