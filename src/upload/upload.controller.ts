import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';

// FileInterceptor: 上传单个；FilesInterceptor 上传多个
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('album')
  // 处理文件的中间件，同时也是一个装饰器
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file)
    return true
  }
}
