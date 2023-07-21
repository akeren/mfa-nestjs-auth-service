import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, LoggerModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
