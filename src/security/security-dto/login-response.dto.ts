import { IAuthResponse } from "../auth.interface";
import { BaseResponse } from "src/common/responses/baseResponse.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResDto extends BaseResponse implements IAuthResponse {

    @ApiProperty({example:"test@mail.com",description:"Email of the user Account"})
    email: string;
    @ApiProperty({example:"randomvalue",description:"Access token for authentication and authropization"})
    token: string;
}