import { Table, Model, Column, DataType, ForeignKey, BelongsToMany, BelongsTo, HasMany } from "sequelize-typescript";
import { Task } from "./task.model";

@Table({
    timestamps: false,
    tableName:"users"
})

export class User extends Model<User>{
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    lastname: string;

    @Column({
        type: DataType.STRING,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.TEXT,
    })
    tokenpush: string;

    @Column({
        type: DataType.STRING,
    })
    created!: string;

    @Column({
        type: DataType.STRING,
    })
    updated!: string;

    @HasMany(() => Task)
    tasks: Task[];
   

}