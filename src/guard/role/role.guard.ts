import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/**
 * 通过nest g gu role 创建一个守卫
 * 守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。
 * 这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权(以及认证)。
 * 中间件是身份验证的良好选择，因为诸如 token 验证或添加属性到 request 对象上与特定路由(及其元数据)没有强关联。
 */


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('经过了守卫');

    // 取得controller 设定的元数据SetMetadata
    const metadata = this.Reflector.get<string[]>('roleName', context.getHandler())
    const req = context.switchToHttp().getRequest<Request>()

    console.log('roleName', req.query.roleName);
    // http://localhost:99/guard?roleName=admin
    if (metadata.includes(req.query.roleName as string)) {
      return true
    } else {
      return false
    }
  }
}
