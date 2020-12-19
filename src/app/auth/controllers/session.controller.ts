import { Controller, Delete, Post, Request, UseGuards, Headers } from '@nestjs/common'
import LocalAuthGuard from 'src/app/auth/guards/local-auth.guard'
import { AuthService } from 'src/app/auth/services/auth.service'

@Controller('auth')
export default class SessionController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Headers('authorization') auth: string) {
    return this.authService.loginJwt(req.user, auth)
  }

  @Delete('logout')
  async logout(@Headers('authorization') auth: string) {
    return this.authService.logoutJwt(auth)
  }
}
