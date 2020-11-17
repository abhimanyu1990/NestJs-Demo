import { plainToClass } from "class-transformer";
import { BaseResponse } from "src/common/responses/baseResponse.dto";
import { ApiProperty } from "@nestjs/swagger";


export class UserResDto extends BaseResponse{
    
    @ApiProperty({example:"test@mail.com"})
    email:string;
    @ApiProperty({example:"John"})
    firstName:string;
    @ApiProperty({example:"Smith"})
    lastName:string;

    static transform(object: any){
        let transformedObj : UserResDto = plainToClass(UserResDto, object, {excludePrefixes:["password","confirmPassword"]});
        return transformedObj;
    }

}