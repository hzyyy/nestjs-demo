import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 往user 模块注入中间件，进行接口拦截；
    // consumer.apply(Logger).forRoutes('user');

    // 或者拦截指定的请求方式
    // consumer.apply(Logger).forRoutes({ path: 'user', method: RequestMethod.GET });

    // 或者拦截指定模块的所有接口
    consumer.apply(Logger).forRoutes(UserController)
  }
}
