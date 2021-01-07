import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from '../dtos/create-task.dto'
import Task from '../models/task.entity'

@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {
  async createTask(taskData: CreateTaskDto, userId: number): Promise<unknown> {
    try {
      const task = this.create({ ...taskData, user_id: userId })

      await this.save(task)

      return task
    } catch (e) {
      throw e
    }
  }

  async findAll(limit?: number): Promise<unknown> {
    try {
      const tasks = await this.find({ take: limit || 10 })

      return tasks
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async findTask(id: number): Promise<unknown> {
    try {
      const task = await this.findOneOrFail({ id })

      return task
    } catch (e) {
      throw e
    }
  }

  async updateTask(id: number, update: CreateTaskDto): Promise<unknown> {
    try {
      const task = await this.findOneOrFail({ id })
      const updatedInfo = this.create(update)
      this.merge(task, updatedInfo)

      await this.save(task)
      return task
    } catch (e) {
      throw e
    }
  }

  async deleteTask(id: number): Promise<unknown> {
    try {
      const task = await this.findOneOrFail({ id })
      await this.delete(id)
      return { message: 'success', id }
    } catch (e) {
      throw e
    }
  }
}
