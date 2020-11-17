import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { Repository } from "typeorm";
import { PermissionEntity } from "./entity/permission.entity";
import { PermissionReqDto } from "./user-dto";

@Injectable()
export class PermissionService {

    constructor(@InjectRepository(PermissionEntity)
                private readonly permissionRepo:Repository<PermissionEntity>,
                private readonly logger:CustomLogger){

                    this.logger.setContext("PermissionService");
              }


    async create(permissionDto: PermissionReqDto ):Promise<any>{
           let permission: PermissionEntity = PermissionReqDto.transformToEntity(permissionDto);
           permission = await this.permissionRepo.save(permission);
           return permission;
    }

}