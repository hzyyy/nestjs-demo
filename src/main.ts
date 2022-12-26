import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 接口开启版本控制，在具体的module api 前，增加v1 / v2 这样的版本，例如 http://localhost:3000/v1
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: 'ZhangYuG',     // 签名 / 加盐
      name: 'SessionName.sid',   // 返回客户端得key 名称
      cookie: { maxAge: 999999999 },             // 设置返回到前端得key 属性
      rolling: true,          // 每次请求时，强行设置cookie，这将重置cookie 过期时间
    }),
  );
  await app.listen(3000);
}
bootstrap();
