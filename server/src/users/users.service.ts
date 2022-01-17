import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(userNo: number): Promise<UsersEntity> {
    const user: UsersEntity = await this.usersRepository.findOne(userNo);
    if (!user) {
      throw new NotFoundException(`${userNo} not found.`);
    }
    return user;
  }
}
