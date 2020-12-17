import {Controller, Delete, Get, Post, Put} from '@nestjs/common'
import UserService from '../../../src/services/user/user.service'

@Controller('users')
export default class User {

  constructor(private userService: UserService) {}

  @Post()
  async createOne(): Promise<string> {
    return await this.userService.createOne()
  }
  
  @Get()
  async findAll(): Promise<string> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findOne(): Promise<string> {
    return await this.userService.findOne()
  }

  @Put(':id')
  async updateOne(): Promise<string> {
    return await this.userService.updateOne()
  }

  @Delete(':id')
  async deleteOne(): Promise<string> {
    return await this.userService.deleteOne()
  } 
}