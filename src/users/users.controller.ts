import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './models';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return new UserDto(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return new UserDto(user);
  }
}
