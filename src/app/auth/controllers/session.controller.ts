import {
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
  Headers,
  NotAcceptableException
} from '@nestjs/common'
import LocalAuthGuard from '../guards/local-auth.guard'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export default class SessionController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Headers('authorization') auth: string) {
    if (auth)
      throw new NotAcceptableException('there is a user already logged in')

    return this.authService.loginJwt(req.user)
  }

  @Delete('logout')
  async logout(@Headers('authorization') auth: string) {
    if (auth) throw new NotAcceptableException('there is no user logged')

    return this.authService.logoutJwt()
  }
}
