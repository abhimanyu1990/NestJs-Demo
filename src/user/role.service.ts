import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { Repository } from "typeorm";
import { PermissionEntity } from "./entity/permission.entity";
import { RoleEntity } from "./entity/role.entity";
import { AssignPermissionsToRoleDto } from "./user-dto";
import { RoleReqDto } from "./user-dto/role.request.dto";

@Injectable()
export class RoleService{

    constructor(@InjectRepository(RoleEntity)
                private readonly roleRepo:Repository<RoleEntity>,
                @InjectRepository(PermissionEntity)
                private readonly permissionRepo:Repository<PermissionEntity>,
                private readonly logger:CustomLogger){

                this.logger.setContext("RoleService");
    }

    async create(roleReqDto:RoleReqDto):Promise<any>{
        let role: RoleEntity = RoleReqDto.transformToEntity(roleReqDto);
        role = await this.roleRepo.save(role);
        return role;
    }

    async assignPermissionsToRole(roleId:number,permissionIds:AssignPermissionsToRoleDto):Promise<any>{
        let permissions: PermissionEntity[] = await this.permissionRepo.findByIds(permissionIds.permissions);
        this.logger.log(permissions,"===permissions======");
        let role: RoleEntity = await this.roleRepo.findOne(roleId);

        permissions.forEach(permission => {
            role.permissions.push(permission);
        })
        this.roleRepo.save(role);
        return permissionIds;
    }
}