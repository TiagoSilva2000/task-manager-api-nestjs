import { registerAs } from '@nestjs/config'
import { AppOptions } from '../interfaces/app-options.interface'

export const appConfig = registerAs(
  'app',
  (): AppOptions => ({
    name: 'spacerkt training',
    description: 'scaffold to training apps in Space Rocket company',
    version: '0.0.1'
  })
)
