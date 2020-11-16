import { Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { LoggerModule } from "src/common/logger/logger.module";
import { FilterModule } from "src/common/filters/filter.module";
import { SecurityService } from "src/security/security.service";
import { SecurityController } from "src/security/security.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "src/configuration/config.module";
import { RedisModule, RedisService } from "nestjs-redis";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        LoggerModule,
        FilterModule,
        ConfigModule,
        JwtModule.register({
            secretOrPrivateKey: 'secret12356789'
        }),
        RedisModule
    ],
    providers:[SecurityService ],
    controllers:[
        SecurityController
    ],
    exports: [SecurityService]
})
export class SecurityModule implements NestModule {
    public configure(){

    }

}