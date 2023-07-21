import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passport: string) {
    try {
      return await this.usersService.verifyUser(email, passport);
    } catch (error) {
      this.logger.error(error);

      throw new UnauthorizedException(error);
    }
  }
}
