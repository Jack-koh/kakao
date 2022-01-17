import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUser() {
    return this.usersService.findAll();
  }

  @Get(':userNo')
  getOneUser(@Param('userNo') userId: number) {
    return this.usersService.findOne(userId);
  }
}
