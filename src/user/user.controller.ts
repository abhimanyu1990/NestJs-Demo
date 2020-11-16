import { Controller, Post } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";
import {UsePipes, ValidationPipe, Body} from "@nestjs/common";
import { UserRequestDto, UserResponseDto } from "./user-dto";
import { ErrorResponse } from "src/common/responses/errorResponse";

@ApiTags('User')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UsePipes(new ValidationPipe())
    @ApiResponse({
        status: 200,
        description: 'User created',
        type: UserResponseDto,
      })
    @ApiResponse({
        status: 404,
        description: 'Error Response',
        type: ErrorResponse
    })
    
    @Post('users')
    async register(@Body() userData: UserRequestDto) {
        return await this.userService.register(userData);
    }


    
}