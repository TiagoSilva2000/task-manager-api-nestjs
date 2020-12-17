import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { INestApplication, Logger } from '@nestjs/common'

import morgan = require('morgan')

import { AppModule } from './app.module'
import { AppOptions } from './interfaces/app-options.interface'

const logger = new Logger('bootstrap')

const DEFAULT_PORT = 3000

function buildSwaggerDoc(app: INestApplication, config: ConfigService) {
  const appOptions = config.get<AppOptions>('app')!
  const options = new DocumentBuilder()
    .setTitle(appOptions.name)
    .setDescription(appOptions.description)
    .setVersion(appOptions.version)
    .build()
  const docsPath = config.get('SWAGGER_PATH', 'docs')
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(docsPath, app, document)
  logger.log(`Docs generated in /${docsPath} using Swagger (OpenAPI)`)
}

function applySecMiddlewares(app: INestApplication) {
  app.use(morgan('dev'))
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const configService = app.get(ConfigService)
  const PORT = parseInt(configService.get('PORT')!) ?? DEFAULT_PORT
  applySecMiddlewares(app)
  buildSwaggerDoc(app, configService)
  if (PORT === DEFAULT_PORT) {
    logger.warn(`App using default port :${DEFAULT_PORT}`)
  }
  await app.listen(PORT, '0.0.0.0')
  logger.log(`App listening to port :${PORT}`)
  logger.log(`App running on: ${await app.getUrl()}`)
}

bootstrap()
