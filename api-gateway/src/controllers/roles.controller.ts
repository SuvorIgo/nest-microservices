import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { CreateRoleDto } from "src/dtos/create-role.dto";
import { UpdateRoleDto } from "src/dtos/update-role.dto";
import { Roles } from "src/guards/roles-auth.decorator";
import { RolesGuard } from "src/guards/roles.guard";

@ApiTags('Roles')
@Controller('/api/roles') 
export class RolesController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 201, description: "Created"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
      return this.appService.createRole(dto);
    }
  
    @ApiOperation({summary: 'Получение всех ролей'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllRoles() {
      return this.appService.getAllRoles();
    }
  
    @ApiOperation({summary: 'Получение роли по #value'})
    @ApiParam({name: "value", type: String, example: "USER", description: "Значение роли пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get(':value')
    getRoleByValue(@Param('value') value: string) {
        return this.appService.getRoleByValue(value);
    } 
  
    @ApiOperation({summary: 'Обновление роли по #value'})
    @ApiParam({name: "value", type: String, example: "USER", description: "Значение роли пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Patch(':value')
    updateRoleByValue(@Param('value') value: string, @Body() dto: UpdateRoleDto) {
        return this.appService.updateRoleByValue(value, dto);
    }
  
    @ApiOperation({summary: 'Удаление роли по #value'})
    @ApiParam({name: "value", type: String, example: "USER", description: "Значение роли пользователя"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':value')
    removeRoleByValue(@Param('value') value: string) {
        return this.appService.removeRoleByValue(value);
    }
}