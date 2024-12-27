import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { User } from "./user.model";
import { UserTask } from "./user_task.model";

@Table({
    timestamps: false,
    tableName:"tasks"
})

export class Task extends Model<Task>{
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

    @BelongsToMany(() => User, () => UserTask)
    users: Array<User & {UserTask: UserTask}>;
   
}