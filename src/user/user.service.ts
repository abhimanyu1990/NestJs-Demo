import { Injectable, NotFoundException, Type } from "@nestjs/common";
import { UserEntity }  from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserReqDto,UserResDto, AssignRolesToUserDto} from "./user-dto";
import { IUser } from "./user.interface";
import { CustomLogger} from "src/common/logger/custom-logger.service";
import { RoleEntity } from "./entity/role.entity";
import { EmailService } from "src/common/email.service";
import { ConfigService } from "src/configuration/config.service";
import { v4 as uuid} from "uuid";
import { VerificationTokenEntity } from "./entity/verificationToken.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepo: Repository<RoleEntity>,
        @InjectRepository(VerificationTokenEntity)
        private readonly verificationTokenRepo:Repository<VerificationTokenEntity>,
        private readonly logger: CustomLogger,
        private readonly emailService:EmailService,
        private readonly configService: ConfigService
      ) {
        this.logger.setContext('UserService');
      }
    
      async register(dto: UserReqDto): Promise<IUser> {
        let entity: UserEntity = UserReqDto.transformToEntity(dto);
        let role: RoleEntity = await this.roleRepo.findOne({where:{"value":"ROLE_USER"}});
        entity.roles = [role];
        entity = await this.userRepository.save(entity);
        this.sendVerificationEmail(entity.email)
        let data : UserResDto = await UserResDto.transform(dto);
        return data;
      }

      async assignRolesToUser(userId:number,roleIds:AssignRolesToUserDto):Promise<IUser>{
            let roles:RoleEntity[] = await this.roleRepo.findByIds(roleIds.roles);
            let user: UserEntity = await this.userRepository.findOne(userId);
            if(user == null){
              throw new NotFoundException("User not found");
            }
            roles.forEach(role => {
              user.roles.push(role);
            });
            user = await this.userRepository.save(user);
            return UserResDto.transform(user);
      }

      async sendVerificationEmail(email:string){
        let subject:string = ConfigService.PROPERTIES.accountVerificationEmail.subject;
        let textBody: string = ConfigService.PROPERTIES.accountVerificationEmail.emailBody;
        let fromEmail:string = ConfigService.PROPERTIES.accountVerificationEmail.fromEmail;
        let host:string = ConfigService.PROPERTIES.server.host
        let port:number = ConfigService.PROPERTIES.server.port
        let token:string = uuid()
        let verificationToken: VerificationTokenEntity = new VerificationTokenEntity()
        verificationToken.email=email;
        verificationToken.token = token;
        verificationToken = await this.verificationTokenRepo.save(verificationToken);
        if(verificationToken != null){
          let verificationLink: string = "http://"+host+":"+port+"/verifyaccount/"+token
          textBody = textBody.replace("$url",verificationLink);
          this.logger.log(textBody,"=== verification link ===");
          this.emailService.sendTextMail(email,subject,textBody,fromEmail);
        }
        
      }


      async verifyAccount(token:string){

        let verificationAccount:VerificationTokenEntity = await this.verificationTokenRepo.findOne({where:{"token":token}});
        if(verificationAccount != null){
            let user = await this.userRepository.findOne({where:{"email":verificationAccount.email}});
            user.isAccountLocked = false;
            await this.userRepository.save(user);

            let delAccount = await this.verificationTokenRepo.delete(verificationAccount);
            console.log(delAccount);

            return "Account verification is successful";
        }
        
        return "Your verification link is not valid";
      }
}