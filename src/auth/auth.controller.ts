import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller({version:'1.0'})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @ApiResponse({ status: 201, description: 'Successfully created'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('auth')
  @ApiResponse({ status: 201, description: 'successfully login'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('auth')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User return successfully'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  getUser(
    @Request() req
  ) {
    return this.authService.getUser(req.user.id);
  }


}
