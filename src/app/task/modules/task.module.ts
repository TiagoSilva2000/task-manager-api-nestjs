import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TaskController from '../controllers/task.controller'
import TaskRepository from '../repositories/task.repository'
import TaskService from '../services/task.service'

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
