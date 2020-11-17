import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { RoleReqDto } from "./user-dto/role.request.dto";
import { RoleResDto } from "./user-dto/role.response.dto";

@ApiTags("Role")
@Controller()
export class RoleController{

    constructor(private readonly roleService:RoleService){}

    @ApiResponse({
        status:200,
        description:"user created",
        type:RoleResDto
    })
    @Post("roles")
    async create(@Body() roleReqDto:RoleReqDto){
        return this.roleService.create(roleReqDto);
    }

}