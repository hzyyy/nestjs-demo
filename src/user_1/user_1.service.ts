import { Injectable } from '@nestjs/common';
import { CreateUser1Dto } from './dto/create-user_1.dto';
import { UpdateUser1Dto } from './dto/update-user_1.dto';

@Injectable()
export class User1Service {
  create(createUser1Dto: CreateUser1Dto) {
    return 'This action adds a new user1';
  }

  findAll() {
    return `来自user1 模块的findAll 方法`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user1`;
  }

  update(id: number, updateUser1Dto: UpdateUser1Dto) {
    return `This action updates a #${id} user1`;
  }

  remove(id: number) {
    return `This action removes a #${id} user1`;
  }
}
