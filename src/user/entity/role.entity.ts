import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { PermissionEntity } from "./permission.entity";

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

    @ManyToMany(() => PermissionEntity)
    @JoinTable()
    permissions: PermissionEntity[];

}