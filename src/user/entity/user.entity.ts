
import { IsEmail, IsNotEmpty } from "class-validator";
import {Column, Entity,PrimaryGeneratedColumn, BeforeInsert, Unique, ManyToMany, JoinTable} from "typeorm";
import * as argon2 from "argon2";
import { RoleEntity } from "./role.entity";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsEmail()
    @Column({ unique: true })
    email:string;

    @IsNotEmpty()
    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @IsNotEmpty()
    @Column()
    password:string;

    @Column()
    isAccountLocked: boolean = true;

    @Column()
    isActive: boolean = true;

    @ManyToMany(() => RoleEntity, { eager: true})
    @JoinTable()
    roles: RoleEntity[];

    @BeforeInsert()
     async hashPassword() {
     this.password = await argon2.hash(this.password);
    }
     
    
}