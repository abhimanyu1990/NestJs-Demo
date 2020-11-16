import { Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { LoggerModule } from "src/common/logger/logger.module";
import { FilterModule } from "src/common/filters/filter.module";
import { SecurityService } from "src/security/security.service";
import { SecurityController } from "src/security/security.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "src/configuration/config.module";
import { RedisModule } from "nestjs-redis";
import { AuthGuard } from "./middleware/authGuard.middleware";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        LoggerModule,
        FilterModule,
        ConfigModule,
        JwtModule.register({}),
        RedisModule
    ],
    providers:[SecurityService , AuthGuard],
    controllers:[
        SecurityController
    ],
    exports: [SecurityService, AuthGuard]
})
export class SecurityModule implements NestModule {
    public configure(){

    }

}