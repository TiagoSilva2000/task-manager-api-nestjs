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
import { CreateTaskDto } from 'src/dtos/create-task.dto'
import TaskService from 'src/services/task/task.service'

@Controller('users/:userid/tasks')
export default class TaskController {
  constructor(private taskservice: TaskService) {}

  @Post()
  async createOne(@Body() createTaskDto: CreateTaskDto): Promise<unknown> {
    return await this.taskservice.createOne(createTaskDto)
  }

  @Get()
  async findAll(@Query('limit') limit?: number): Promise<unknown> {
    return await this.taskservice.findAll(limit)
  }

  @Get(':taskid')
  async findOne(@Param('taskid') taskid: number): Promise<unknown> {
    return await this.taskservice.findOne(taskid)
  }

  @Put(':taskid')
  async updateOne(
    @Param('taskid') taskid: number,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<unknown> {
    return await this.taskservice.updateOne(taskid, createTaskDto)
  }

  @Delete(':taskid')
  async deleteOne(@Param('taskid') taskid: number): Promise<unknown> {
    return await this.taskservice.deleteOne(taskid)
  }
}
