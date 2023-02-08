import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm' 

@Entity() // 通过这个装饰器，把这个类，装饰成实体类，Sql 相当于一个表
// 同时，Sqltest 也是表名
export class Sqltest {
  @PrimaryGeneratedColumn('uuid') // id自增
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;
}
