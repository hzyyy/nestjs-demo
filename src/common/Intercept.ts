import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Data<T> {
  data: T
}

// 利用rxjs，编写api 拦截器
@Injectable()
export class Intercept<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Data<T>> | Promise<Observable<any>> {
    return next.handle().pipe(map(data => {
      return {
        data,
        code: 0,
        message: '请求成功',
        success: true
      }
    }))
  }
}