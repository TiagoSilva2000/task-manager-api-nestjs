import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from '../services/app.service'
import { config } from '../../../configs'
import { AppController } from '../controllers/app.controller'
import { AuthModule } from '../../auth/modules/auth.module'
import { TaskModule } from '../../task/modules/task.module'
import { UserModule } from '../../user/modules/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: config }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database')!,
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    AuthModule,
    TaskModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
