import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserDto } from '../dtos/create-user.dto'
import UserService from '../services/user.service'
import UserController from './user.controller'

const mockService = () => ({
  createOne: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn()
})

describe('UserController', () => {
  let controller: UserController
  let service
  let user
  let id

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockService }]
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  describe('createOne', () => {
    // it('should throw an error, if there is a user logged in')

    it('should return the user, if enough data is provided', async () => {
      const data: CreateUserDto = {
        email: 'mail@mail.com',
        name: 'name',
        password: 'password',
        password_confirmation: 'password_confirmation'
      }
      user = {
        id: 1,
        email: 'mail@mail.com',
        name: 'name'
      }
      service.createOne.mockResolvedValue(user)
      const result = await controller.createOne(data)

      expect(service.createOne).toHaveBeenCalled()
      expect(result).toEqual(user)
    })
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: 1,
          email: 'mail@mail.com',
          name: 'name'
        }
      ]
      service.findAll.mockResolvedValue(users)
      const result = await controller.findAll()

      expect(service.findAll).toHaveBeenCalled()
      expect(result).toEqual(users)
    })
  })

  describe('findOne', () => {
    // it('should throw an error, if the user is not logged in')

    it('should return the user', async () => {
      id = 1
      user = {
        id: 1,
        email: 'mail@mail.com',
        name: 'name'
      }

      service.findOne.mockResolvedValue(user)
      const result = await controller.findOne(user)

      expect(service.findOne).toHaveBeenCalled()
      expect(result).toEqual(user)
    })
  })
})
