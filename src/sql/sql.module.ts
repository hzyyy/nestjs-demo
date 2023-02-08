import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SqlService } from './sql.service';
import { SqlController } from './sql.controller';
import { Sqltest } from './entities/sql.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sqltest])],
  controllers: [SqlController],
  providers: [SqlService]
})
export class SqlModule {}
