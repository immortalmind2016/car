import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);
    return this.usersService.create(email, hashedPassword);
  }
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isSamePassword = compareSync(password, user.password);
    if (!isSamePassword) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
