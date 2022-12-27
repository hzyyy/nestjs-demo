/**
 * 中间件
 * nest g mi Logger 创建一个中间件
 * nest 的中间件，使用的是express
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('控制台输出：我是middleware logger 中间件');
    
    next();
  }
}
