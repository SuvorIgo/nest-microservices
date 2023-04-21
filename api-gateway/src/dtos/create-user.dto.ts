import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Логин пользователя (почтовый адрес)'})
    readonly login: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    readonly password: string;
}