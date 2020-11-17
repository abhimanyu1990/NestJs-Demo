import { Controller, Post } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import {UsePipes, ValidationPipe, Body} from "@nestjs/common";
import { UserReqDto, UserResDto } from "./user-dto";
import { ErrorResponse } from "src/common/responses/errorResponse";

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UsePipes(new ValidationPipe())
    @ApiResponse({
        status: 200,
        description: 'User created',
        type: UserResDto,
      })
    @ApiResponse({
        status: 404,
        description: 'Error Response',
        type: ErrorResponse
    })
    
    @Post('users')
    async register(@Body() userData: UserReqDto) {
        return await this.userService.register(userData);
    }


    
}