import { Global, Module } from '@nestjs/common';

const config = {
  provide: 'child-module',
  useValue: { name: 'ZhangYuG' },
};

@Global()
@Module({
  // 自定义注入; 也可以使用工厂模式，详见：https://blog.csdn.net/qq1195566313/article/details/126494064
  providers: [config],
  exports: [config],
})
export class ChildModuleModule {}
