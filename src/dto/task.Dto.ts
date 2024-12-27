import { Task } from "../models/task.model";
import { ITask } from "../interfaces/task";
import moment from "moment";
import { UserTask } from "../models/user_task.model";
import MESSAGE_RESPONSE from "../helpers/message";
import { User } from "../models/user.model";

export async function createTask(data: ITask) {

    try {

    let newTask = await Task.create({
        title: data.title,
        completed: data.completed,
        created: moment().format()
    });

    let userTask = await UserTask.create({
        user_id: data.user_id,
        user_asigned: data.user_asigned_id,
        task_id: newTask.dataValues.id
    });

    if(newTask.dataValues && userTask.dataValues){
        return {
            status: true,
            data: {
                message: MESSAGE_RESPONSE.CREATED_TASK_SUCCESS,
                ...newTask.dataValues,
                ...userTask.dataValues
            }
        }
    }

    } catch (error) {
        console.log(error);
        return {
            status: true,
            data: {
                message: MESSAGE_RESPONSE.CREATED_TASK_ERROR
            }
        }
    }
}

export async function getMyTasks(userId: number) {
    try {

    let user = await User.findByPk(userId, {
        include: Task
    });

    if(!user.tasks){
        return {
            status: true,
            data: {
                message: 'No se pudo obtener las tareas'
            }
        }
    }

    return {
        status: true,
        data: [...user.tasks]
    }

    } catch (error) {
        console.log(error);
        return {
            status: true,
            data: {
                message: 'Error. No se pudo obtener las tareas'
            }
        }
    }
}