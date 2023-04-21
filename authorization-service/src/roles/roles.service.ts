import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../entities/roles.entity';

const logger = new Logger('MessageProcessing')

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRespository: typeof Role) {}

    async createRole(dto) {
        logger.log('{root: \'roles\', cmd: \'create\'}');

        return await this.roleRespository.create(dto);
    }

    async getAllRoles() {
        logger.log('{root: \'roles\', cmd: \'getAll\'}');

        return await this.roleRespository.findAll();
    }

    async getRoleByValue(value: string) {
        logger.log('{root: \'roles\', cmd: \'getByValue\'}');

        return await this.roleRespository.findOne({where: {value}});
    }

    async updateRoleByValue(payload) {
        logger.log('{root: \'roles\', cmd: \'updateByValue\'}');

        const role_id = (await this.getRoleByValue(payload.value)).role_id;

        return await this.roleRespository.update({...payload.dto}, {where: {role_id}});
    }

    async removeRoleByValue(value: string) {
        logger.log('{root: \'roles\', cmd: \'removeByValue\'}');

        const role_id = (await this.getRoleByValue(value)).role_id;

        return await this.roleRespository.destroy({where: {role_id}});
    }
}
