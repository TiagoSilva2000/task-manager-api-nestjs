import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from 'src/app/auth/services/auth.service'

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<unknown> {
    const user = await this.authService.validate({ email, password })
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
