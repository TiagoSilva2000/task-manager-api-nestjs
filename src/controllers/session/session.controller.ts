import {Controller, Post} from '@nestjs/common'

@Controller('account')
export default class SessionController {
  @Post()
  async login() {

  }

  @Post()
  async logout() {

  }
}