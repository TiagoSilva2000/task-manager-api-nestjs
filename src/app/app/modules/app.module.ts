import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from '../services/app.service'
import { config } from '../../../configs'
import TaskController from '../../task/controllers/task.controller'
import UserController from '../../user/controllers/user.controller'
import TaskService from '../../task/services/task.service'
import LocalStrategy from 'src/app/auth/strategies/local.strategy'
import { AuthService } from 'src/app/auth/services/auth.service'
import LocalAuthGuard from 'src/app/auth/guards/local-auth.guard'
import { JwtService, JwtModule } from '@nestjs/jwt'
import { jwtConstants } from 'src/app/auth/constants'
import JwtStrategy from 'src/app/auth/strategies/jwt.strategy'
import JwtAuthGuard from 'src/app/auth/guards/jwt-auth.guard'
import OwnerAuthGuard from 'src/app/auth/guards/owner.auth.guard'
import { AppController } from '../controllers/app.controller'
import UserService from '../../user/services/user.service'
import SessionController from '../../auth/controllers/session.controller'
@Module({
  imports: [
    ConfigModule.forRoot({ load: config }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database')!,
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    JwtModule.register({
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '360s' }
    })
  ],
  controllers: [
    AppController,
    TaskController,
    UserController,
    SessionController
  ],
  providers: [
    AppService,
    TaskService,
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    OwnerAuthGuard
  ]
})
export class AppModule {}
