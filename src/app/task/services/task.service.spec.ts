import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import TaskRepository from '../repositories/task.repository'
import TaskService from './task.service'

const mockRepo = () => ({
  createTask: jest.fn(),
  findTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  findAll: jest.fn()
})

describe('TaskService', () => {
  let task
  let service
  let repo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useFactory: mockRepo }
      ]
    }).compile()
    repo = module.get<TaskRepository>(TaskRepository)
    service = module.get<TaskService>(TaskService)
  })

  it('everything should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })

  describe('createTask', () => {
    it('should return taskContent if succeced', async () => {
      task = {
        title: 'title',
        description: 'lalal',
        due_date: '2020-05-15',
        creator_id: 1
      }
      repo.createTask.mockResolvedValue(task)
      const result = await service.createOne(task)

      expect(repo.createTask).toHaveBeenCalled()
      expect(result).toEqual(task)
    })
  })

  describe('findOne', () => {
    it('should return found task', async () => {
      const id = 1
      task = {
        title: 'title',
        description: 'lalal',
        due_date: '2020-05-15',
        creator_id: 1
      }
      repo.findTask.mockResolvedValue(task)
      const result = await service.findOne(id)
      expect(repo.findTask).toHaveBeenCalled()
      expect(result).toEqual(task)
    })
    it('should throws an error when task doesnt exist', async () => {
      const id = 999

      repo.findTask.mockResolvedValue(null)
      try {
        await service.findOne(id)
      } catch (e) {
        expect(repo.findTask).toBeCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findAll', () => {
    it('should return all tasks within a limit', async () => {
      const limit = 5
      const tasks = [
        {
          title: 'title',
          description: 'lalal',
          due_date: '2020-05-15',
          creator_id: 1
        }
      ]
      repo.findAll.mockResolvedValue(tasks)

      const result = await service.findAll(limit)
      expect(repo.findAll).toHaveBeenCalled()
      expect(result).toEqual(tasks)
    })

    it('should return empty array when no task exists', async () => {
      const limit = 5
      const tasks = []
      repo.findAll.mockResolvedValue(tasks)

      const result = await service.findAll(limit)
      expect(repo.findAll).toHaveBeenCalled()
      expect(result).toEqual(tasks)
    })
  })

  describe('updatetask', () => {
    it('should throws an error when task doesnt exist', async () => {
      const id = 999
      const update = {
        title: 'title'
      }

      repo.updateTask.mockResolvedValue(null)
      try {
        await service.updateOne(id, update)
      } catch (e) {
        expect(repo.updatetask).toBeCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
    it('should return the task when find one and has enough information', async () => {
      const id = 1
      const update = {
        title: 'updated_title'
      }
      const updatedtask = {
        title: 'updated_title',
        description: 'lalal',
        due_date: '2020-05-15',
        creator_id: 1
      }

      repo.updateTask.mockResolvedValue(updatedtask)

      const result = await service.updateOne(id, update)

      expect(result).toEqual(updatedtask)
    })
  })

  describe('deletetask', () => {
    it('should throws an error when task doesnt exist', async () => {
      const id = 999

      repo.deleteTask.mockResolvedValue(null)
      try {
        await service.deleteOne(id)
      } catch (e) {
        expect(repo.deleteTask).toBeCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })

    it('should return success message if everything goes fine', async () => {
      const id = 1
      const successMessage = {
        message: 'success',
        id
      }
      repo.deleteTask.mockResolvedValue(successMessage)

      const result = await service.deleteOne(id)
      expect(repo.deleteTask).toHaveBeenCalled()
      expect(result).toEqual(successMessage)
    })
  })
})
