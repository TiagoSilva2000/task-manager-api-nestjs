import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { UserEntity } from '../../models'
import { CreateUserDto } from 'src/dtos/create-user.dto'
import { UpdateUserDto } from 'src/dtos/update-user.dto'
import {hash} from 'bcrypt'

@Injectable()
export default class UserService {

  async createOne(userData: CreateUserDto): Promise<unknown> {
    try {
      const userRepo = getRepository(UserEntity)
      const {password} = userData
      const hashedPassword = await hash(password, 10)

      const user = userRepo.create({...userData, password: hashedPassword})
    
      await userRepo.save(user)
      return user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async findAll(limit?: number): Promise<unknown> {
    try {
      const userRepo = getRepository(UserEntity)
      const users = await userRepo.find({ take: limit || 10 })

      return users
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async findOne(id: number): Promise<unknown> {
    try {
      const userRepo = getRepository(UserEntity)
      const user = await userRepo.findOneOrFail({ id })

      if (!user) throw new Error("user wasn't found")

      return user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async updateOne(id: number, update: UpdateUserDto): Promise<unknown> {
    try {
      if (update.password)
        throw new Error('tentativa de mudar a senha por essa rota não é permitida')


      const userRepo = getRepository(UserEntity)
      const user = await userRepo.findOneOrFail({ id })
      const updatedInfo = userRepo.create(update)
      userRepo.merge(user, updatedInfo)

      await userRepo.save(user)
      return user
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async deleteOne(id: number): Promise<unknown> {
    try {
      const userRepo = getRepository(UserEntity)
      const user = await userRepo.findOneOrFail({ id })
      if (user) {
        await userRepo.delete(id)
      }
      return { message: 'success', id }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
