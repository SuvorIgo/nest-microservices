import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '../entities/roles.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @MessagePattern({role: 'roles', cmd: 'create'})
    createRole(dto) {
        return this.roleService.createRole(dto);
    }

    @MessagePattern({role: 'roles', cmd: 'getAll'})
    getAllRoles() {
        return this.roleService.getAllRoles();
    }

    @MessagePattern({role: 'roles', cmd: 'getByValue'})
    getRoleByValue(value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @MessagePattern({role: 'roles', cmd: 'updateByValue'})
    updateRoleByRole(payload) {
        return this.roleService.updateRoleByValue(payload);
    }

    @MessagePattern({role: 'roles', cmd: 'removeByValue'})
    removeRoleByRole(value: string) {
        return this.roleService.removeRoleByValue(value);
    }
}
