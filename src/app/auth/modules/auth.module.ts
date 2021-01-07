import { Module } from '@nestjs/common'
import { jwtConstants } from '../constants'
import SessionController from '../controllers/session.controller'
import JwtAuthGuard from '../guards/jwt-auth.guard'
import LocalAuthGuard from '../guards/local-auth.guard'
import OwnerAuthGuard from '../guards/owner.auth.guard'
import { AuthService } from '../services/auth.service'
import JwtStrategy from '../strategies/jwt.strategy'
import LocalStrategy from '../strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import UserService from 'src/app/user/services/user.service'
import TokenService from '../services/token.service'
import TokenRepository from '../repositories/token.repository'
import UserRepository from 'src/app/user/repositories/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRepository, UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secretKey,
      // signOptions: { expiresIn: `${jwtConstants.expTime}d` }
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [SessionController],
  providers: [
    AuthService,
    TokenService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    OwnerAuthGuard
  ]
})
export class AuthModule {}
