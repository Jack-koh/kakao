import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(createUserDto.password, salt);
    const user = this.create({ ...createUserDto, password: hashedPw });
    try {
      console.log(user);
      await this.save(user);
    } catch ({ code }) {
      if (code === '23505') throw new ConflictException('Existing name');
      else throw new InternalServerErrorException();
    }
  }
}
