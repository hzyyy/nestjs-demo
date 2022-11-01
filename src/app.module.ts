import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiModule } from './rest_api/rest_api.module';
import { TestController } from './test/test.controller';

@Module({
  imports: [RestApiModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
