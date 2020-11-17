import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "./user.entity";

@Entity("roles")
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column({unique:true})
    value: string;

    @Column()
    description: string;

    @ManyToMany(() => PermissionEntity,{
        eager: true
    })
    @JoinTable()
    permissions: PermissionEntity[];


}