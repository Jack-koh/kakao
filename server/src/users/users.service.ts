import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './utils/users.repository';
import { CreateUserDto, AccessUserDto } from './utils/dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.createUser(createUserDto);
  }

  async signIn(accessUserDto: AccessUserDto): Promise<{ accessToken: string }> {
    const { email, password } = accessUserDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else throw new UnauthorizedException('login failed');
  }

  // findAll(): Promise<UsersRepository[]> {
  //   return this.usersRepository.createQueryBuilder('users').getMany();
  // }

  // async findOne(userNo: number): Promise<UsersRepository> {
  //   const user: UsersRepository = await this.usersRepository.findOne(userNo);
  //   if (!user) {
  //     throw new NotFoundException(`${userNo} not found.`);
  //   }
  //   return user;
  // }
}
