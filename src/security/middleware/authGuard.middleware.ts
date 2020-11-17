import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private reflector: Reflector,
        private readonly logger: CustomLogger,
        private readonly jwtService: JwtService,) {
        this.logger.setContext('AuthGuard');
    }

    canActivate(context: ExecutionContext): boolean {
        const authority = this.reflector.get<string>('authority', context.getHandler());
        if (!authority) {
            return true;
         }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const authorization = request.get("Authorization");
        if (authorization != "" && authorization != null) {
            let decode = this.jwtService.decode(authorization);
            let verify = this.jwtService.verify(authorization, { secret: "secret12356789" })
            
            if (verify != null && verify.user.permissions.find(element => element == authority) != null) {
                return true;
            }
        }

        return false;
    }
}