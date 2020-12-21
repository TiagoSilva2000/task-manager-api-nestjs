import { Module } from '@nestjs/common'
import TaskController from '../controllers/task.controller'
import TaskService from '../services/task.service'

@Module({
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
