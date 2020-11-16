import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    //private reflector: Reflector
    constructor(private readonly logger: CustomLogger,
        private readonly jwtService: JwtService,) {
        this.logger.setContext('AuthGuard');
    }

    canActivate(context: ExecutionContext): boolean {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        //   if (!roles) {
        //     return true;
        //   }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const authorization = request.get("Authorization");
        if (authorization != "" && authorization != null) {
            let decode = this.jwtService.decode(authorization);
            let verify = this.jwtService.verify(authorization, { secret: "secret12356789" })
            if (verify != null) {
                return true;
            }
        }

        return false;
    }
}