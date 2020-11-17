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
import { JwtModule, JwtService } from "@nestjs/jwt";
import { BootstrapService } from './bootstrap.service';
import { UserEntity } from "src/user/entity/user.entity";
import { PermissionEntity } from "src/user/entity/permission.entity";
import { RoleEntity } from "src/user/entity/role.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot(config[process.env.NODE_ENV]["ormConfig"]),
    TypeOrmModule.forFeature([UserEntity, PermissionEntity, RoleEntity]),
    UserModule,
    SecurityModule,
    LoggerModule,
    FilterModule,
    ConfigModule,
    RedisModule.register(config[process.env.NODE_ENV]["redis"]),
    JwtModule.register({})
  ],
  controllers: [AppController],
  providers: [
    AppService, BootstrapService
  ]
})
export class AppModule {
  constructor(private readonly connection: Connection) {
        
  }
}
