import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { CreateUserDto } from "src/dtos/create-user.dto";
import { RegistrationUserDto } from "src/dtos/registration-user.dto";

@ApiTags('Authorization & Registration')
@Controller('/api') 
export class AuthController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 201, description: "Created"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.appService.login(dto);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, description: "Created"})
    @ApiResponse({ status: 400, description: "Bad Request" })
    @Post('/registration')
    registration(@Body() dto: RegistrationUserDto) {
        return this.appService.registration(dto);
    }
}