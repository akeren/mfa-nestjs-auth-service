import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, GetUserDto } from './dto';
import { UsersRepository } from './users.repository';
import { User } from './models';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);

    const user = new User({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });

    return await this.usersRepository.create(user);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!(await this.isValidPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid Login credentials! ');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.usersRepository.findOne(getUserDto);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      throw new UnprocessableEntityException('Email already exist!');
    }
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  private async isValidPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
