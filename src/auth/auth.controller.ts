import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport';

@Controller({version:'1.0'})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('auth')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('auth')
  @UseGuards(AuthGuard('jwt'))
  getUser(
    @Request() req
  ) {
    return this.authService.getUser(req.user.id);
  }


}
