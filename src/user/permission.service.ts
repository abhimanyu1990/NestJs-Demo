import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { Repository } from "typeorm";
import { PermissionEntity } from "./entity/permission.entity";
import { IPermission } from "./permission.interface";
import { PermissionReqDto, PermissionResDto } from "./user-dto";

@Injectable()
export class PermissionService {

    constructor(@InjectRepository(PermissionEntity)
                private readonly permissionRepo:Repository<PermissionEntity>,
                private readonly logger:CustomLogger){

                    this.logger.setContext("PermissionService");
              }


    async create(permissionDto: PermissionReqDto ):Promise<IPermission>{
           let permission: PermissionEntity = PermissionReqDto.transformToEntity(permissionDto);
           permission = await this.permissionRepo.save(permission);
           return PermissionResDto.transform(permission);
    }

}