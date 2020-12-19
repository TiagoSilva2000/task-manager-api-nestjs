import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { CreateUserDto } from 'src/app/user/dtos/create-user.dto'
import JwtAuthGuard from 'src/app/auth/guards/jwt-auth.guard'
import OwnerAuthGuard from 'src/app/auth/guards/owner.auth.guard'
import UserService from '../services/user.service'

@Controller('users')
export default class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createOne(@Body() body: CreateUserDto): Promise<unknown> {
    return await this.userService.createOne(body)
  }

  @Get()
  async findAll(@Query('limit') limit?: number): Promise<unknown> {
    return await this.userService.findAll(limit)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<unknown> {
    return await this.userService.findOne(userId)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Put(':userId')
  async updateOne(
    @Param('userId') userId: number,
    @Body() body: CreateUserDto
  ): Promise<unknown> {
    return await this.userService.updateOne(userId, body)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Delete(':userId')
  async deleteOne(@Param('userId') userId: number): Promise<unknown> {
    return await this.userService.deleteOne(userId)
  }
}
