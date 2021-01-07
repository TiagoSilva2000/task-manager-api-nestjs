import { EntityRepository, Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import User from '../models/user.entity'
import * as bcrypt from 'bcrypt'
import { NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from '../dtos/update-user.dto'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async createUser(userData: CreateUserDto) {
    try {
      const { password, ...shareableData } = userData
      const hashedPassword = await bcrypt.hash(password, 10)

      const user = this.create({ ...userData, password: hashedPassword })

      await this.save(user)
      return shareableData
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async findUser(id: number) {
    try {
      const user = await this.findOneOrFail({ id })

      return user
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.findOneOrFail({
        where: { email },
        select: ['id', 'email', 'name', 'password']
      })

      return user
    } catch (e) {
      throw new NotFoundException()
    }
  }

  async findAll(limit?: number): Promise<unknown> {
    try {
      const users = await this.find({ take: limit || 10 })

      return users
    } catch (e) {
      throw e
    }
  }

  async updateUser(id: number, update: UpdateUserDto): Promise<unknown> {
    try {
      const user = await this.findOneOrFail({ id })
      const updatedInfo = this.create(update)
      this.merge(user, updatedInfo)

      await this.save(user)
      return user
    } catch (e) {
      throw e
    }
  }

  async deleteUser(id: number): Promise<unknown> {
    try {
      const user = await this.findOneOrFail({ id })
      await this.delete(id)
      return { message: 'success', id }
    } catch (e) {
      throw e
    }
  }
}
