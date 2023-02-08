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
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlModule } from './sql/sql.module';

@Module({
  imports: [
    RestApiModule,
    UserModule,
    User1Module,
    ListModule,
    ChildModuleModule,
    UploadModule,
    PipeDtoModule,
    SpiderModule,
    SwaggerModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '123456', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'db', //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    SqlModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
