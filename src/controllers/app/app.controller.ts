import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AppService } from '../../services/app.service'
import crypto from 'crypto'
@Controller()
// @ApiTags('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: String, description: 'Hello world' })
  getHello(): string {
    return this.appService.getHello()
  }
}
