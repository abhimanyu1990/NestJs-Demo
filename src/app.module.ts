import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import { UserModule } from './user/user.module';
import { SecurityModule } from './security/security.module';
import { LoggerModule } from './common/logger/logger.module';
import { FilterModule } from './common/filters/filter.module';
import { ConfigModule } from './configuration/config.module';
import config from "src/configuration/properties";
import {RedisModule} from "nestjs-redis";


@Module({
  imports: [
    TypeOrmModule.forRoot(config[process.env.NODE_ENV]["ormConfig"]),
    UserModule,
    SecurityModule,
    LoggerModule,
    FilterModule,
    ConfigModule,
    RedisModule.register(config[process.env.NODE_ENV]["redis"]),
 
    
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private readonly connection: Connection) {
        
  }
}
