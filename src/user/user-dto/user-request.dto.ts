'use strict';

import { ApiProperty } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import {IsEmail, IsNotEmpty} from "class-validator";
import { MatchFieldValue, MatchRegex } from "src/common/validators";
import { UserEntity } from "src/user/entity/user.entity";

export class UserRequestDto{
    
    @ApiProperty({ example: "test@mail.com", description: 'The email of user', required:true,uniqueItems:true })
    @IsNotEmpty()
    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    @ApiProperty({ example: "John", description: 'First name of the suer',required:true })
    readonly firstName:string;

    @ApiProperty({ example: "Smith", description: 'Last name of the suer',required:false })
    readonly lastName:string;

    @ApiProperty({ example: "Test@123", description: 'Minimum 8 letters, Alphanumeric, must contain atleast one capital letter, small letter, number and special character',required:true })
    @MatchRegex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    @MatchFieldValue('confirmPassword')
    readonly password:string;

    @ApiProperty({ example: "Test@123", description: 'Password and confirmPassword must match',required:true })
    readonly confirmPassword:string;

    static transformToEntity(userRequestDto: UserRequestDto){
        return plainToClass(UserEntity, userRequestDto);
    }
}