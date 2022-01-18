import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, AccessUserDto } from './utils/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() accessUserDto: AccessUserDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(accessUserDto);
  }

  // @Get()
  // async getAllUser() {
  //   const users = await this.usersService.findAll();
  //   return this.usersService.findAll();
  // }

  // @Get(':userNo')
  // getOneUser(@Param('userNo') userId: number) {
  //   return this.usersService.findOne(userId);
  // }
}
