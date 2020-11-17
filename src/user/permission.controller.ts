import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Authority } from "../security/authority.decorator";
import { PermissionService } from "./permission.service";
import { PermissionReqDto, PermissionResDto } from "./user-dto";

@ApiTags("permissions")
@Controller()
export class PermissionController {

        constructor(private readonly permissionService: PermissionService){

        }

        @ApiResponse({
            status:200,
            description:"Permission Created",
            type:PermissionResDto
        })

        @Post("permissions")
        @Authority("CREATE_PERMISSION")
        async create(@Body() permissionDto: PermissionReqDto ){
                return this.permissionService.create(permissionDto);
        }
        
}