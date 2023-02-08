import { Request } from 'express';
import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator, SetMetadata } from '@nestjs/common';

// 自定义装饰器 

export const Role = (...args: string[]) => SetMetadata('roleName', args);

export const ReqUrl = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>()

  console.log('ReqUrl', data);
  return req.url
})