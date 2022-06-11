import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from './decerators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.gaurd';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // @UseInterceptors(new CurrentUserInterceptor(new UsersService()))
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    console.log('TEST');
    return user;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get('/:id')
  async findUser(@Param() id) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @Get('/:id') findAllUsers(@Query() email: string) {
    return this.usersService.find(email);
  }
  @Delete('/:id')
  removeUser(@Param() id) {
    return this.usersService.remove(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param() id, @Body() attrs: UpdateUserDto) {
    return this.usersService.update(parseInt(id), attrs);
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }
}
