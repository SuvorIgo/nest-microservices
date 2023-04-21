import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { CreateProfilesDto } from "src/dtos/create-profiles.dto";
import { UpdateProfilesDto } from "src/dtos/update-profiles.dto";
import { Roles } from "src/guards/roles-auth.decorator";
import { RolesGuard } from "src/guards/roles.guard";

@ApiTags('Profiles')
@Controller('/api/profiles') 
export class ProfilesController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({summary: 'Создание профиля'})
    @ApiResponse({status: 201, description: "Created"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createProfile(@Body() dto: CreateProfilesDto) {
      return this.appService.createProfile(dto);
    }
  
    @ApiOperation({summary: 'Получение всех профилей'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllProfiles() {
        return this.appService.getAllProfiles();
    }
  
    @ApiOperation({summary: 'Получение профиля по #id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор профиля"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN", "USER")
    @UseGuards(RolesGuard)
    @Get(':id')
    getOneProfile(@Param('id') id: number) {
      return this.appService.getOneProfile(+id);
    }
  
    @ApiOperation({summary: 'Обновление профиля по #id'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN", "USER")
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateProfile(@Param('id') id: number, @Body() dto: UpdateProfilesDto) {
      return this.appService.updateProfile(+id, dto);
    }
  
    @ApiOperation({summary: 'Удаление профиля по #id'})
    @ApiParam({name: "id", type: Number, example: 1, description: "Уникальный идентификатор профиля"})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 403, description: "Forbidden"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Roles("ADMIN", "USER")
    @UseGuards(RolesGuard)
    @Delete(':id')
    removeProfile(@Param('id') id: number) {
      return this.appService.removeProfile(+id);
    }
}