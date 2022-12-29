import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { Response } from 'express'
import { zip } from 'compressing'

// FileInterceptor: 上传单个；FilesInterceptor 上传多个
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

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

  // 直接下载文件
  @Get('export')
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1672239760168.png')

    res.download(url)
  }

  @Get('stream')
  async download_2(@Res() res: Response) {
    const url = join(__dirname, '../images/1672239760168.png')
    const stream = new zip.Stream()

    await stream.addEntry(url)

    // 设置响应头
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;fileName=xiaoman.png`);

    stream.pipe(res)
  }
}
