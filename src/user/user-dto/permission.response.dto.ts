import { ApiProperty } from "@nestjs/swagger";


export class PermissionResDto {

    @ApiProperty({example:"Create User"})
    name:string;

    @ApiProperty({example:"CREATE_USER"})
    value:string;

    @ApiProperty({example:"This permission is specifically meant for creating a user"})
    description:string;
    
}