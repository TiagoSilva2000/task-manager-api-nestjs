import { Injectable } from '@nestjs/common'

@Injectable()
export default class UserService {
  async createOne(): Promise<string> {
    return 'created'
  }
  
  async findAll(): Promise<string> {
    return 'all users were found'
  }

  async findOne(): Promise<string> {
    return 'the requested user were found'
  }

  async updateOne(): Promise<string> {
    return 'the requested user were updated'
  }

  async deleteOne(): Promise<string> {
    return 'the requested user were deleted'
  } 
}