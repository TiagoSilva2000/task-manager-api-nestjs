import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from 'src/app/task/dtos/create-task.dto'
import TaskEntity from '../models/task.entity'
import { getRepository } from 'typeorm'

@Injectable()
export default class TaskService {
  async createOne(taskData: CreateTaskDto): Promise<unknown> {
    try {
      const taskRepo = getRepository(TaskEntity)
      const task = taskRepo.create({ ...taskData })

      await taskRepo.save(task)

      return task
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async findAll(limit?: number): Promise<unknown> {
    try {
      const taskRepo = getRepository(TaskEntity)
      const tasks = await taskRepo.find({ take: limit || 10 })

      return tasks
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async findOne(id: number): Promise<unknown> {
    try {
      const taskRepo = getRepository(TaskEntity)
      const task = await taskRepo.findOneOrFail({ id })

      if (!task) throw new Error("task wasn't found")

      return task
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async updateOne(id: number, update: CreateTaskDto): Promise<unknown> {
    try {
      const taskRepo = getRepository(TaskEntity)
      const task = await taskRepo.findOneOrFail({ id })
      const updatedInfo = taskRepo.create(update)
      taskRepo.merge(task, updatedInfo)

      await taskRepo.save(task)
      return task
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async deleteOne(id: number): Promise<unknown> {
    try {
      const taskRepo = getRepository(TaskEntity)
      const task = await taskRepo.findOneOrFail({ id })
      if (task) {
        await taskRepo.delete(id)
      }
      return { message: 'success', id }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
