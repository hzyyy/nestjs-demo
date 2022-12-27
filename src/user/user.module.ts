import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 往user 模块注入中间件
    consumer.apply(Logger).forRoutes('user');
  }
}
