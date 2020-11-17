import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { Repository } from "typeorm";
import { RoleEntity } from "./entity/role.entity";
import { RoleReqDto } from "./user-dto/role.request.dto";

@Injectable()
export class RoleService{

    constructor(@InjectRepository(RoleEntity)
                private readonly roleRepo:Repository<RoleEntity>,
                private readonly logger:CustomLogger){

                this.logger.setContext("RoleService");
    }

    async create(roleReqDto:RoleReqDto):Promise<any>{
        let role: RoleEntity = RoleReqDto.transformToEntity(roleReqDto);
        role = await this.roleRepo.save(role);
        return role;
    }

}