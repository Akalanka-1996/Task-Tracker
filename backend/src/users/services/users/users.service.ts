import { Injectable } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { use } from 'passport';
import { encodePassword } from 'src/auth/utils/bcrypt';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User, SerializedUser } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  // get the repository
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // mock users
  /*
  private users: User[] = [
    {
      id: 1,
      username: 'kasun',
      password: 'kasun',
    },
    {
      id: 2,
      username: 'akalanka',
      password: 'akalanka',
    },
    {
      id: 3,
      username: 'gamage',
      password: 'gamage',
    },
  ];
  */

  private users : User[] = [];

  getUsers() {
      return this.users.map((user) => plainToClass(SerializedUser, user))
  }

  getUsersByUsername(username: string) {
      return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password) // hash password
    const newUser = this.userRepository.create({...createUserDto, password}) // creates the object
    return this.userRepository.save(newUser); //save the created user

  }

  deleteUser(id: number) {
    this.userRepository.delete({id})
    return {deleted: true}
  }

  findUserByUsername(username: string) {
    console.log("find one by username")
      // return this.userRepository.findOne({where: {username: username}, relations: ['username'] })
      return this.userRepository.findOne({username})

  }
}
