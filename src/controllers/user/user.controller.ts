import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { CreateUserDto } from 'src/dtos/create-user.dto'
import UserService from 'src/services/user/user.service'

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

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<unknown> {
    return await this.userService.findOne(id)
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: CreateUserDto
  ): Promise<unknown> {
    return await this.userService.updateOne(id, body)
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<unknown> {
    return await this.userService.deleteOne(id)
  }
}
