
import { IsEmail, IsNotEmpty } from "class-validator";
import {Column, Entity,PrimaryGeneratedColumn, BeforeInsert, Unique} from "typeorm";
import * as argon2 from "argon2";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsEmail()
    @Column({ unique: true })
    email:string;

    @IsNotEmpty()
    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @IsNotEmpty()
    @Column()
    password:string;

    @Column()
    is_account_locked: boolean = true;

    @Column()
    is_active: boolean = true;

    @BeforeInsert()
     async hashPassword() {
     this.password = await argon2.hash(this.password);
    }
     
    
}