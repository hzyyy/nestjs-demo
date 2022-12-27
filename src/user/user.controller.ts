import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Session,
  Headers,
  HttpCode,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(): string {
    return '这是user 模块'
  }

  // @Get()
  // findAll(@Request() req, @Session() session) {
  //   return {
  //     code: 0,
  //     result: 'get,' + 123,
  //   };
  // }

  // /**
  //  * (@body() req) ：直接获取body 得内容
  //  * (@body('name') req) ：直接获取body 参数name 字段得内容
  //  */
  // @Post()
  // add(@Request() req) {
  //   return {
  //     code: 0,
  //     result: 'add,' + req.body?.name,
  //   };
  // }

  // /**
  //  * 动态路由
  //  * 另一种装饰器写法：@param('id') params
  //  */
  // @Get(':id')
  // @HttpCode(304)  // 直接设定http status
  // findId(@Request() req, @Headers() headers) {
  //   console.log(headers);
  //   return {
  //     code: 0,
  //     result: {
  //       id: req.params.id
  //     }
  //   }
  // }

  // 生成验证码
  @Get('code')
  createCode(@Request() req, @Response() res, @Session() session) {
    console.log('code');
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });

    // 验证码数值存到session。另外，session 是保存在服务器上，cookie 是保存到浏览器的
    session.code = captcha.text;

    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('login')
  login(@Body() body, @Session() session) {
    const { graphicCode } = body;
    const { code } = session;

    if (graphicCode?.toLocaleLowerCase() === code?.toLocaleLowerCase()) {
      return {
        code: 0,
        message: '登录成功'
      };
    } else {
      return {
        code: 1,
        message: '验证码错误'
      };
    }
  }
}
