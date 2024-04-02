import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @Get('/signin')
  signin(@Query() query) {
    return this.authService.signin({query});
  }

  @Public()
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup({body: createUserDto});
  }

  @Get('/auth')
  auth(@Query() query) {
    return this.authService.auth();
  }
}
