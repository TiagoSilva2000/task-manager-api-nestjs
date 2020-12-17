import { Injectable } from '@nestjs/common'

@Injectable()
export default class TaskService {
  async createOne(): Promise<string> {
    return 'created'
  }
  
  async findAll(): Promise<string> {
    return 'all tasks were found'
  }

  async findOne(): Promise<string> {
    return 'the requested task were found'
  }

  async updateOne(): Promise<string> {
    return 'the requested task were updated'
  }

  async deleteOne(): Promise<string> {
    return 'the requested task were deleted'
  } 
}