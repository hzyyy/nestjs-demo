import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({    // 文件上传后存放的位置 dist/images
      destination: join(__dirname, '../images'),
      filename: (_, file, callback) => {
        // 处理上传的文件名称，重命名
        // extname() 截取文件的后缀，比如.PNG、.jpg

        const fileName = `${new Date().getTime() + extname(file.originalname) }`
        
        return callback(null, fileName)
      }
    }),    
  })],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
