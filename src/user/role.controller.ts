import { Body, Controller, Post, Param, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { Authority } from "../security/authority.decorator";
import { RoleService } from "./role.service";
import { AssignPermissionsToRoleDto } from "./user-dto";
import { RoleReqDto } from "./user-dto/role.request.dto";
import { RoleResDto } from "./user-dto/role.response.dto";

@ApiTags("Role")
@Controller()
export class RoleController{

    constructor(private readonly roleService:RoleService,
                private readonly logger:CustomLogger){}

    @ApiResponse({
        status:200,
        description:"user created",
        type:RoleResDto
    })

    @Post("roles")
    @Authority('CREATE_ROLE')
    async create(@Body() roleReqDto:RoleReqDto){
        return this.roleService.create(roleReqDto);
    }

    @Post("roles/:roleId/permissions")
    @Authority('ASSIGN_PERMISSION')
    async assignPermissionToRole(@Param('roleId') roleId: number, @Body() permissionIds: AssignPermissionsToRoleDto){
        return this.roleService.assignPermissionsToRole(roleId,permissionIds);
    }

}