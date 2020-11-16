import { plainToClass } from "class-transformer";
import { BaseResponse } from "src/common/responses/baseResponse.dto";
import { ApiProperty } from "@nestjs/swagger";


export class UserResponseDto extends BaseResponse{
    
    @ApiProperty({example:"test@mail.com"})
    email:string;
    @ApiProperty({example:"John"})
    first_name:string;
    @ApiProperty({example:"Smith"})
    last_name:string;

    static transform(object: any){
        let transformedObj : UserResponseDto = plainToClass(UserResponseDto, object, {excludePrefixes:["password","confirmPassword"]});
        return transformedObj;
    }

}