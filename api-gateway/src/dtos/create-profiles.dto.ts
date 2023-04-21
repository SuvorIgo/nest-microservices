import { ApiProperty } from "@nestjs/swagger";

export class CreateProfilesDto {

    @ApiProperty({example: 'Маша', description: 'Имя пользователя'})
    readonly name: string;

    @ApiProperty({example: 'Машина', description: 'Фамилия пользователя'})
    readonly surname: string;

    @ApiProperty({example: '89194782674', description: 'Номер телефона пользователя'})
    readonly numberPhone: number;

    @ApiProperty({example: 'М', description: 'Гендерная принадлежность пользователя'})
    readonly gender: string;

    @ApiProperty({example: '1 январия 2011', description: 'Дата рождения пользователя'})
    readonly dateBirth?: Date;

    @ApiProperty({example: 'Старый Оскол', description: 'Город пользователя'})
    readonly city?: string;
}
