import { ApiProperty } from "@nestjs/swagger";


export class RoleResDto {

    @ApiProperty({example:"Role Admin"})
    name:string;

    @ApiProperty({example:"ROLE_ADMIN"})
    value:string;

    @ApiProperty({example:"This role is specifically meant for Admin"})
    description:string;
    
}