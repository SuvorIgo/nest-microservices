import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Значение роли пользователя'})
    readonly value: string;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    readonly userId: number;
}