import { Table, Model, Column, DataType, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
    timestamps: false,
    tableName:"tasks"
})

export class Task extends Model<Task>{

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_asigned_id: number;

    @Column({
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    completed: boolean;

    @Column({
        type: DataType.STRING,
    })
    created: string;

    @Column({
        type: DataType.STRING,
    })
    date_completed: string;

   @BelongsTo(() => User, { as: 'Owner' })
   user: User

   @BelongsTo(() => User, { as: 'Asigned' })
   asigned: User


}