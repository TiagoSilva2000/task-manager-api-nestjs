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
import { CreateTaskDto } from 'src/app/task/dtos/create-task.dto'
import JwtAuthGuard from 'src/app/auth/guards/jwt-auth.guard'
import OwnerAuthGuard from 'src/app/auth/guards/owner.auth.guard'
import TaskService from 'src/app/task/services/task.service'

@Controller('users/:userid/tasks')
export default class TaskController {
  constructor(private taskservice: TaskService) {}

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Post()
  async createOne(@Body() createTaskDto: CreateTaskDto): Promise<unknown> {
    return await this.taskservice.createOne(createTaskDto)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Get()
  async findAll(@Query('limit') limit?: number): Promise<unknown> {
    return await this.taskservice.findAll(limit)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Get(':taskId')
  async findOne(@Param('taskId') taskId: number): Promise<unknown> {
    return await this.taskservice.findOne(taskId)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Put(':taskId')
  async updateOne(
    @Param('taskId') taskId: number,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<unknown> {
    return await this.taskservice.updateOne(taskId, createTaskDto)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Delete(':taskId')
  async deleteOne(@Param('taskId') taskId: number): Promise<unknown> {
    return await this.taskservice.deleteOne(taskId)
  }
}
