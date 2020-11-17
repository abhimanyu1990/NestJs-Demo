import { Injectable, Type } from "@nestjs/common";
import { UserEntity }  from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserReqDto,UserResDto} from "./user-dto";
import { IUser } from "./user.interface";
import { CustomLogger} from "src/common/logger/custom-logger.service";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
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

      
}