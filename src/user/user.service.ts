import { Injectable, NotFoundException, Type } from "@nestjs/common";
import { UserEntity }  from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserReqDto,UserResDto, AssignRolesToUserDto} from "./user-dto";
import { IUser } from "./user.interface";
import { CustomLogger} from "src/common/logger/custom-logger.service";
import { RoleEntity } from "./entity/role.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepo: Repository<RoleEntity>,
        private readonly logger: CustomLogger
      ) {
        this.logger.setContext('UserService');
      }
    
      async register(dto: UserReqDto): Promise<IUser> {
        let entity: UserEntity = UserReqDto.transformToEntity(dto);
        entity = await this.userRepository.save(entity);
        let data : UserResDto = await UserResDto.transform(dto);
        return data;
      }

      async assignRolesToUser(userId:number,roleIds:AssignRolesToUserDto):Promise<any>{
            let roles:RoleEntity[] = await this.roleRepo.findByIds(roleIds.roles);
            let user: UserEntity = await this.userRepository.findOne(userId);
            if(user == null){
              throw new NotFoundException("User not found");
            }
            roles.forEach(role => {
              user.roles.push(role);
            })

            return this.userRepository.save(user);
      }
}