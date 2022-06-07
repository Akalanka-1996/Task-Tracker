import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/auth/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // @Inject('USER_SERVICE') private readonly userService: UsersService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('Inside validate user');
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password); // compare passwords
      if (matched) {
        console.log('User validation success!');
        return userDB;
      } else {
        console.log('Passwords do not match');
        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
