import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common"
import { Request, Response } from 'express'

export class InterceptorError implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    // 这里添加Request 的泛型，是为了更好的代码提示
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    response.status(status).json({
      status,
      data: exception.message,
      code: 1,
      path: request.url
    })
  }
}