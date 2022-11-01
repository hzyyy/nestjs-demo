import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getName') // 调整路由后，当前方法的访问地址变成了http://localhost:3000/getName
  getName(): string {
    return this.appService.getName();
  }
}
