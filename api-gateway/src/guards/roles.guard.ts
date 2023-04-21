import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable, identity } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            for (let i = 0; i < requiredRoles.length; i++) {
                const user_id = req.params.id;
                const dataJwt = this.jwtService.decode(token);
                const role = dataJwt['roles'][0]['value'];

                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({message: 'Пользователь не авторизован'});
                }

                if (role == "USER") {
                    if (user_id != dataJwt['id']) {
                        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
                    }
                }
                const user = await this.jwtService.verifyAsync(token, {secret: 'secret_key_secret'});

                req.user = user;

                return user.roles.some(role => requiredRoles.includes(role.value));
            }
        }
        catch (err) {
            console.log(err);
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}