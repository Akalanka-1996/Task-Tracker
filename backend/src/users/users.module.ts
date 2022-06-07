import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Post } from 'src/typeorm/Post';
import { Profile } from 'src/typeorm/Profile';
import { Category } from 'src/typeorm/Category';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';


@Module({
  // import typeorm to user module
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Category])],
  controllers: [UsersController],
  providers: [{
    provide: 'USER_SERVICE',
    useClass: UsersService,
  }]
})
export class UsersModule {}
