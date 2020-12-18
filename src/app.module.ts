import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from './services/app.service'
import { AppController } from './controllers/app/app.controller'
import { config } from './configs'
import TaskController from './controllers/task/task.controller'
import UserController from './controllers/user/user.controller'
import TaskService from './services/task/task.service'
import UserService from './services/user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({ load: config }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database')!,
      imports: [ConfigModule],
      inject: [ConfigService]
    })
  ],
  controllers: [AppController, TaskController, UserController],
  providers: [AppService, TaskService, UserService]
})
export class AppModule {}
