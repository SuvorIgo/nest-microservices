import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { AddRoleDto } from "src/dtos/add-role.dto";
import { UpdateUserDto } from "src/dtos/update-user.dto";
import { Roles } from "src/guards/roles-auth.decorator";
import { RolesGuard } from "src/guards/roles.guard";

@ApiTags('Users')
@Controller('/api/users') 
export class UsersController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
    return this.appService.getAllUsers();
    }

    @ApiOperation({summary: 'Получение пользователя по #user_id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN", "USER")
    @UseGuards(RolesGuard)
    @Get(':id')
    getOneUser(@Param('id') id: number) {
    return this.appService.getOneUser(+id);
    }

    @ApiOperation({summary: 'Обновление данных пользователя по #user_id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN", "USER")
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.appService.updateUser(+id, dto);
    }

    @ApiOperation({summary: 'Выдача роли'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post(':role')
    addRole(@Body() dto: AddRoleDto) {
    return this.appService.addRole(dto);
    }

    @ApiOperation({summary: 'Удаление пользователя по #user_id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN", "USER")
    @UseGuards(RolesGuard)
    @Delete(':id')
    removeUser(@Param('id') id: number) {
    return this.appService.removeUser(+id);
    }   
}
