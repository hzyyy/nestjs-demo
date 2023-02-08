import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiModule } from './rest_api/rest_api.module';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';
import { User1Module } from './user_1/user_1.module';
import { ListModule } from './list/list.module';
import { ChildModuleModule } from './child-module/child-module.module';
import { UploadModule } from './upload/upload.module';
import { PipeDtoModule } from './pipe-dto/pipe-dto.module';
import { SpiderModule } from './spider/spider.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [RestApiModule, UserModule, User1Module, ListModule, ChildModuleModule, UploadModule, PipeDtoModule, SpiderModule, SwaggerModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
