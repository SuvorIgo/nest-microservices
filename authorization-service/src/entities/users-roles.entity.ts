import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./users.entity";
import { Role } from "./roles.entity";

@Table({
    tableName: 'UsersRoles', 
    createdAt: false, 
    updatedAt: false
})
export class UsersRoles extends Model<UsersRoles> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    usersRoles_id: number;

    @ForeignKey(() => User)
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;

    @ForeignKey(() => Role)
    @ApiProperty({example: '1', description: 'Уникальный идентификатор роли'})
    @Column({
        type: DataType.INTEGER,
    })
    role_id: number;
}