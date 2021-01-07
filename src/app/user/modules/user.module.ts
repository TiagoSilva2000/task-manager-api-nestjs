import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserController from '../controllers/user.controller'
import { passwordConfirmation } from '../middlewares/password-confirmation.middleware'
import UserRepository from '../repositories/user.repository'
import UserService from '../services/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(passwordConfirmation).forRoutes('users/signin', {
      path: 'users/:userId',
      method: RequestMethod.PUT
    })
  }
}
