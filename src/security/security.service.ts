import { HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginRequestDto, LoginResponseDto } from "src/security/security-dto";
import { IAuthResponse } from "src/security/auth.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { RedisService } from "nestjs-redis";
import { ConfigService } from "src/configuration/config.service";


@Injectable()
export class SecurityService {

    private redisClient = null;
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly logger: CustomLogger,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly redisService:RedisService
    ) {
        this.logger.setContext('UserService');
        this.redisClient =  this.redisService.getClient(ConfigService.PROPERTIES.redis.name);
    }

    async login(loginDto: LoginRequestDto): Promise<IAuthResponse> {

    

        let user: UserEntity = await this.userRepository.findOne({ where: { email: loginDto.email } });

        if (user == null) {
            throw new NotFoundException("User doesn't exist")
        }

        if (!user.is_active || user.is_account_locked) {
           // throw new UnauthorizedException(" User account is locked or deactivated. Please contact support");
        }


        let isPasswordMatched: boolean = await argon2.verify(user.password, loginDto.password);
        if (isPasswordMatched) {
            let payload = { "email": user.email, "user": { "id": user.id, "first_name": user.first_name, "is_active": user.is_active, "is_account_locked": user.is_account_locked } };
            const accessToken = this.jwtService.sign(payload, { expiresIn: '2d', subject: user.email, algorithm: "HS512", secret: "testing" });
            let authResponse: LoginResponseDto = new LoginResponseDto();
            authResponse.email = user.email;
            authResponse.token = accessToken;
            this.redisClient.set(user.email,authResponse.token,'EX',3600);
            return authResponse;
        } else {
            throw new UnauthorizedException("Credentials are wrong. Kindly try again with right email and password.");
        }
    }

}