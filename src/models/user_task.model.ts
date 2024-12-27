import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";
import { Task } from "./task.model";

@Table({
    timestamps: false,
    tableName:"user_task"
})

export class UserTask extends Model<UserTask>{
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user_id: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER,
    })
    task_id: number;

    @Column({
        type: DataType.INTEGER,
    })
    user_asigned: number;

}