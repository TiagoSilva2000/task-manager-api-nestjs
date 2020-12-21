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

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: jwtConstants.expTime + 's' }
    })
  ],
  controllers: [SessionController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    OwnerAuthGuard
  ]
})
export class AuthModule {}
