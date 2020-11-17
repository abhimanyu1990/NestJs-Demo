import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CustomLogger } from "./common/logger/custom-logger.service";
import { PermissionEntity } from "./user/entity/permission.entity";
import { RoleEntity } from "./user/entity/role.entity";
import { UserEntity } from "./user/entity/user.entity";
import { PermissionsList, RolesList } from "./roles-and-permission";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BootstrapService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepo: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionRepo: Repository<PermissionEntity>,
        private readonly logger: CustomLogger) { }

    async createAdmin() {
        await this.createPermissions();
        await this.createRoles();
        let user:UserEntity = await this.userRepo.findOne();
        if( user == null ){
            let role: RoleEntity = await this.roleRepo.findOne({where:{"value":"ROLE_ADMIN"}});
            let user = new UserEntity();
            user.email = "admin@example.com";
            user.firstName = "Admin";
            user.lastName = "Admin";
            user.isAccountLocked = false;
            user.isActive = true;
            user.password = "Test@123"
            user.roles = [role];
            this.userRepo.save(user);
        }

    }

    async createRoles() {

        let role = await this.roleRepo.find()
        if (role.length == 0) {
            RolesList.forEach(async role => {
                let list = await this.permissionRepo.find({ "value": In(role.permissionValueList) });
                let newRole = new RoleEntity();
                newRole.name = role.name;
                newRole.value = role.value;
                newRole.description = role.description;
                newRole.permissions = list;
                await this.roleRepo.save(newRole);
            })
        }

        return;
    }

    async createPermissions() {
        let permission: PermissionEntity[] = await this.permissionRepo.find();
        if (permission.length == 0) {
            await this.permissionRepo.save(PermissionsList);
        }
        return;
    }
}