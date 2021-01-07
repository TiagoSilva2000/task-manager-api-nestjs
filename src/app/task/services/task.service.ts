import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from '../dtos/create-task.dto'
import { InjectRepository } from '@nestjs/typeorm'
import TaskRepository from '../repositories/task.repository'

@Injectable()
export default class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  async createOne(taskData: CreateTaskDto, userId: number): Promise<unknown> {
    return this.taskRepository.createTask(taskData, userId)
  }

  async findAll(limit?: number): Promise<unknown> {
    return this.taskRepository.findAll(limit)
  }

  async findOne(id: number): Promise<unknown> {
    return this.taskRepository.findTask(id)
  }

  async updateOne(id: number, update: CreateTaskDto): Promise<unknown> {
    return this.taskRepository.updateTask(id, update)
  }

  async deleteOne(id: number): Promise<unknown> {
    return this.taskRepository.deleteTask(id)
  }
}
