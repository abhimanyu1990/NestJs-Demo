import { ApiProperty } from "@nestjs/swagger";


export class AssignRolesToUserDto{
    
    @ApiProperty({example:[1,2]})
    roles:number[];

}