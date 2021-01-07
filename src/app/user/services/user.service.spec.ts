import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import UserRepository from '../repositories/user.repository'
import UserService from './user.service'

const mockRepo = () => ({
  createUser: jest.fn(),
  findUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  findAll: jest.fn()
})

describe('UserService', () => {
  let user
  let service
  let repo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockRepo }
      ]
    }).compile()
    repo = module.get<UserRepository>(UserRepository)
    service = module.get<UserService>(UserService)
  })

  it('everything should be defined', () => {
    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })

  describe('createUser', () => {
    // it('should throws an error if not enough information was given' , async () => {
    //   user = {
    //     name: 'name',
    //     email: 'email@email.com'
    //   }
    //   repo.createUser.mockResolvedValue

    //   try {

    //   } catch(e) {
    //     expect(repo.createUser).toHaveBeenCalled()
    //     expect(async () => await service.createOne(user))
    //   }
    // })

    it('should return userContent if succeeded', async () => {
      user = {
        name: 'name',
        email: 'email@email.com',
        password: 'password'
      }
      repo.createUser.mockResolvedValue({ name: user.name, email: user.email })
      const result = await service.createOne(user)
      expect(repo.createUser).toHaveBeenCalled()
      expect(result).toEqual({
        name: user.name,
        email: user.email
      })
    })
  })

  describe('findOne', () => {
    it('should return found user', async () => {
      const id = 1
      user = {
        id,
        email: 'amendoas',
        name: 'pickles'
      }

      repo.findUser.mockResolvedValue(user)
      const result = await service.findOne(id)
      expect(repo.findUser).toHaveBeenCalled()
      expect(result).toEqual(user)
    })
    it('should throws an error when user doesnt exist', async () => {
      const id = 999

      repo.findUser.mockResolvedValue(null)
      try {
        await service.findOne(id)
      } catch (e) {
        expect(repo.findUser).toBeCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findAll', () => {
    it('should return all users within a limit', async () => {
      const limit = 5
      const users = [
        {
          id: 1,
          name: 'name',
          email: 'mail@mail'
        }
      ]
      repo.findAll.mockResolvedValue(users)

      const result = await service.findAll(limit)
      expect(repo.findAll).toHaveBeenCalled()
      expect(result).toEqual(users)
    })

    it('should return empty array when no user exists', async () => {
      const limit = 5
      const users = []
      repo.findAll.mockResolvedValue(users)

      const result = await service.findAll(limit)
      expect(repo.findAll).toHaveBeenCalled()
      expect(result).toEqual(users)
    })
  })

  describe('updateUser', () => {
    it('should throws an error when attempts to change password', async () => {
      const id = 1
      const update = {
        name: 'newname',
        password: 'newpass',
        password_confirmation: 'newpass_conf'
      }
      try {
        await service.updateOne(id, update)
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException)
      }
    })
    it('should throws an error when user doesnt exist', async () => {
      const id = 999
      const update = {
        name: 'newname'
      }

      repo.updateUser.mockResolvedValue(null)
      try {
        await service.updateOne(id, update)
      } catch (e) {
        expect(repo.updateUser).toBeCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
    it('should return the user when find one and has enough information', async () => {
      const id = 1
      const update = {
        name: 'newname'
      }
      const updatedUser = {
        id,
        name: 'newname',
        email: 'mockmail@mail.com'
      }

      repo.updateUser.mockResolvedValue(updatedUser)

      const result = await service.updateOne(id, update)

      expect(result).toEqual(updatedUser)
    })
  })

  describe('deleteUser', () => {
    it('should throws an error when user doesnt exist', async () => {
      const id = 999

      repo.deleteUser.mockResolvedValue(null)
      try {
        await service.deleteOne(id)
      } catch (e) {
        expect(repo.deleteUser).toBeCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })

    it('should return success message if everything goes fine', async () => {
      const id = 1
      const successMessage = {
        message: 'success',
        id
      }

      repo.deleteUser.mockResolvedValue(successMessage)

      const result = await service.deleteOne(id)
      expect(repo.deleteUser).toHaveBeenCalled()
      expect(result).toEqual(successMessage)
    })
  })
})
