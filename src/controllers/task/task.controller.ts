import {Controller, Delete, Get, Post, Put} from '@nestjs/common'
import TaskService from '../../../src/services/task/task.service'

@Controller('tasks')
export default class TaskController {
  
  constructor(private taskservice: TaskService) {}

  @Post()
  async createOne(): Promise<string> {
    return await this.taskservice.createOne()
  }
  
  @Get()
  async findAll(): Promise<string> {
    return await this.taskservice.findAll()
  }

  @Get(':taskid')
  async findOne(): Promise<string> {
    return await this.taskservice.findOne()
  }

  @Put(':taskid')
  async updateOne(): Promise<string> {
    return await this.taskservice.updateOne()
  }

  @Delete(':taskid')
  async deleteOne(): Promise<string> {
    return await this.taskservice.deleteOne()
  } 
}