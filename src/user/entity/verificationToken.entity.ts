import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VerificationTokenEntity {

    @PrimaryColumn()
    @IsEmail()
    email:string;

    @Column({nullable:true})
    token:string;

}