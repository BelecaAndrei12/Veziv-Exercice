import { Body, Controller, Get, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './model/dtos/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './model/dtos/login-user.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.registerUser(createUserDto);
      return { message: 'User added succesfully', user };
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const token = await this.userService.loginUser(loginUserDto);
      return {
        message: token,
        type: 'JWT',
        expires_in: '2h'
      }
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id:number) {
    return this.userService.getUserById(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id/upload-image')
  async uploadProfileImage(@Param('id') id: number, @Body() payload: any) {
    try {
      const image = payload.image
      const user = await this.userService.uploadUserImage(id, image);
      return { message: 'User image updated successfully', user };
    } catch (error) {
      throw new HttpException({ error: error.message }, error.status);
    }
  }
}
