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
import { CreateTaskDto } from '../dtos/create-task.dto'
import JwtAuthGuard from '../../auth/guards/jwt-auth.guard'
import OwnerAuthGuard from '../../auth/guards/owner.auth.guard'
import TaskService from '../../task/services/task.service'

@Controller('users/:userId/tasks')
export default class TaskController {
  constructor(private readonly taskservice: TaskService) {}

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Post()
  async createOne(
    @Body() createTaskDto: CreateTaskDto,
    @Param('userId') userId: number
  ): Promise<unknown> {
    return this.taskservice.createOne(createTaskDto, userId)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Get()
  async findAll(@Query('limit') limit?: number): Promise<unknown> {
    return this.taskservice.findAll(limit)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Get(':taskId')
  async findOne(@Param('taskId') taskId: number): Promise<unknown> {
    return this.taskservice.findOne(taskId)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Put(':taskId')
  async updateOne(
    @Param('taskId') taskId: number,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<unknown> {
    return this.taskservice.updateOne(taskId, createTaskDto)
  }

  @UseGuards(JwtAuthGuard, OwnerAuthGuard)
  @Delete(':taskId')
  async deleteOne(@Param('taskId') taskId: number): Promise<unknown> {
    return this.taskservice.deleteOne(taskId)
  }
}
