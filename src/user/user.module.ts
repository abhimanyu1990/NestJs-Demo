import { Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { LoggerModule } from "src/common/logger/logger.module";
import { FilterModule } from "src/common/filters/filter.module";
import { AppModule } from "src/app.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        LoggerModule,
        FilterModule
    ],
    providers:[UserService ],
    controllers:[
        UserController
    ],
    exports: [UserService]
})
export class UserModule implements NestModule {
    public configure(){

    }

}