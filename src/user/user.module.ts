import { Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { LoggerModule } from "src/common/logger/logger.module";
import { FilterModule } from "src/common/filters/filter.module";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { PermissionEntity } from "./entity/permission.entity";
import { RoleEntity } from "./entity/role.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { CommonModule } from "src/common/common.module";
import { ConfigModule } from "src/configuration/config.module";
import { VerificationTokenEntity } from "./entity/verificationToken.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, PermissionEntity, RoleEntity, VerificationTokenEntity]),
        LoggerModule,
        FilterModule,
        CommonModule,
        ConfigModule
    ],
    providers:[UserService, PermissionService, RoleService ],
    controllers:[
        UserController, PermissionController, RoleController
    ],
    exports: [UserService]
})

export class UserModule implements NestModule {
    public configure(){
    }

}