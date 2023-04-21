import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsToMany} from "sequelize-typescript";
import { Role } from "src/entities/roles.entity";
import { UsersRoles } from "./users-roles.entity";


@Table({tableName: 'Users'})
export class User extends Model<User> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    user_id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Логин пользователя (почтовый адрес)'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    login: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль пользователя'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @BelongsToMany(() => Role, () => UsersRoles)
    roles: Role[];
}