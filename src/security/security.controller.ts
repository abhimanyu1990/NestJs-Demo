import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { Post , Body } from "@nestjs/common";
import { LoginReqDto, LoginResDto } from "src/security/security-dto";
import { SecurityService } from "src/security/security.service";
import { ApiResponse}  from "@nestjs/swagger";
import { ErrorResponse } from "src/common/responses/errorResponse";
@ApiTags('Auth')
@Controller()
export class SecurityController{
    constructor(private readonly securityService: SecurityService) { }

    @ApiResponse({
        status: 200,
        description: 'User created',
        type: LoginResDto,
      })
    @ApiResponse({
        status: 404,
        description: 'Error Response',
        type: ErrorResponse
    })
    @Post('login')
    async login(@Body() loginDto: LoginReqDto) {
        return await this.securityService.login(loginDto);
    }
    
}