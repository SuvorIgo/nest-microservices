import { ApiProperty } from "@nestjs/swagger";

export class RegistrationUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Логин пользователя (почтовый адрес)'})
    readonly login: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    readonly password: string;

    @ApiProperty({example: 'Маша', description: 'Имя пользователя'})
    readonly name: string;

    @ApiProperty({example: 'Машина', description: 'Фамилия пользователя'})
    readonly surname: string;

    @ApiProperty({example: '89194782674', description: 'Номер телефона пользователя'})
    readonly numberPhone: number;

    @ApiProperty({example: 'М', description: 'Гендерная принадлежность пользователя'})
    readonly gender: string;
}