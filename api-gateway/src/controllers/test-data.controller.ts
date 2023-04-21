import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "src/app.service";
import { AddRoleDto } from "src/dtos/add-role.dto";
import { UpdateUserDto } from "src/dtos/update-user.dto";
import { Roles } from "src/guards/roles-auth.decorator";
import { RolesGuard } from "src/guards/roles.guard";

@ApiTags('TestEndpoint')
@Controller('/api/insert-testing-data') 
export class TestDataController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({summary: 'Добавление данных для тестирования API'})
    @ApiResponse({status: 200, description: "Success"})
    @ApiResponse({ status: 400, description: "Bad Request"})
    @Get()
    async test() {
        return await this.appService.testData();
    }
}