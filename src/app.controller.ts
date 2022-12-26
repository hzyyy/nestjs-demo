import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { User1Service } from './user_1/user_1.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly user1Service: User1Service,
    @Inject('child-module') private readonly childModule: any,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getName') // 调整路由后，当前方法的访问地址变成了http://localhost:3000/getName
  getName(): string {
    return this.appService.getName();
  }

  // 调用user1 模块下的方法
  @Get('getUser1')
  getUser1(): string {
    return this.user1Service.findAll();
  }

  // 调用child-module 模块下的自定义注入值
  @Get('getChildModuleCustomValue')
  getChildModuleCustomValue(): string {
    return this.childModule.name;
  }
}
