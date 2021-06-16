import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './user.controller';
import { HashService } from '../auth/hash.service';
import { UserOauth } from './userOauth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserOauth])],
  providers: [UsersService, HashService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
