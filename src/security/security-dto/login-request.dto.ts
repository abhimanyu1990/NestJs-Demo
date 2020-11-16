import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { MatchRegex } from "src/common/validators";


export class LoginRequestDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example:"test@mail.com",description:"Email of the user Account"})
    email:string;

    @IsNotEmpty()
    @MatchRegex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    @ApiProperty({example:"Test@123",description:"Password of the user account"})
    password: string;

}