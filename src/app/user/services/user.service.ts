import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import UserRepository from '../repositories/user.repository'
import User from '../models/user.entity'

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async createOne(userData: CreateUserDto): Promise<unknown> {
    return this.userRepository.createUser(userData)
  }

  async findAll(limit?: number): Promise<unknown> {
    return this.userRepository.findAll(limit)
  }

  async findOne(id: number): Promise<unknown> {
    return this.userRepository.findUser(id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email)
  }

  async updateOne(id: number, update: UpdateUserDto): Promise<unknown> {
    try {
      if (update.password)
        throw new UnauthorizedException(
          'attempting to change the password by this route is not allowed'
        )

      return this.userRepository.updateUser(id, update)
    } catch (e) {
      throw e
    }
  }

  async deleteOne(id: number): Promise<unknown> {
    return this.userRepository.deleteUser(id)
  }
}
