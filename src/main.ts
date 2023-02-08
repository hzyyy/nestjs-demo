import { join } from 'path';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { InterceptorResponse } from './common/InterceptorResponse';
import { InterceptorError } from './common/InterceptorError';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 全局中间件
function GlobalMiddleware(req: Request, res: Response, next: NextFunction) {
  const whiteList = ['/user']
  
  if(whiteList.indexOf(req.originalUrl) == -1) {
    next()
  } else {
    res.send({ message: '这里是main.ts 全局拦截：user 模块禁止进入'})
  }
}

async function bootstrap() {
  // NestExpressApplication 是给create() 方法增加一个泛型，可以更加友好的代码提示和推断
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // 可以直接通过url 访问指定目录中的静态资源，比如：localhost:3000/images/123123.png
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images' // 访问静态资源的前缀
  })

  // 接口开启版本控制，在具体的module api 前，增加v1 / v2 这样的版本，例如 http://localhost:3000/v1
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 全局跨域处理
  app.use(cors());

  // 挂载全局中间件
  app.use(GlobalMiddleware);

  // 挂载api 全局响应拦截器
  app.useGlobalInterceptors(new InterceptorResponse())
  // 挂载api 全局异常拦截器
  app.useGlobalFilters(new InterceptorError())

  // 挂载nestjs 内置的全局Pipe 管道，也可以自定义验证逻辑。目前在pipe-dto 功能中，使用了自定义的逻辑
  // app.useGlobalPipes(new ValidationPipe())

  // swagger https://docs.nestjs.cn/9/recipes?id=swagger
  const swagger_options = new DocumentBuilder()
    .setTitle('章鱼哥接口文档')
    .setVersion('1.0')
    .addTag('simon')
    .build();
  const swagger_doc = SwaggerModule.createDocument(app, swagger_options)
  SwaggerModule.setup('swagger-api', app, swagger_doc)

  app.use(
    session({
      secret: 'ZhangYuG',     // 签名 / 加盐
      name: 'SessionName.sid',   // 返回客户端得key 名称
      cookie: { maxAge: 999999999 },             // 设置返回到前端得key 属性
      rolling: true,          // 每次请求时，强行设置cookie，这将重置cookie 过期时间
    }),
  );
  await app.listen(99);
}
bootstrap();
