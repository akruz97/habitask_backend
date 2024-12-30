import { Task } from "../models/task.model";
import { ITask } from "../interfaces/task";
import moment from "moment";
import { UserTask } from "../models/user_task.model";
import MESSAGE_RESPONSE from "../helpers/message";
import { User } from "../models/user.model";
import { getUserByEmail, getUserById } from "./userDto";
import { Op } from "sequelize";


export async function deleteTask(taskId: number, userId: number) {
    try {

        let task = await Task.findOne({
            where: {
                id: taskId
            }
        });


        let taskUser = await UserTask.findOne({
            where: {
                task_id: taskId,
                //user_id: userId
            }
        })

        if(taskUser.user_id !== userId){
            return { 
                status: false,
                data: {
                    message: 'No puedes eliminar esta tarea, no eres el propietario'
                }
            }
        }

        if(task.dataValues && !task.dataValues.completed){
            await taskUser.destroy();
            await task.destroy();
            
            return { 
                status: true,
                data: {
                    message: 'Se ha eliminado la tarea con éxito'
                }
            }
        }

        return { 
            status: false,
            data: {
                message: 'No se ha podido eliminar la tarea, o ya se ha marcado como completada'
            }
        }

      

    } catch (error) {
        console.log(error);
        return { 
            status: false,
            data: {
                message: 'No se ha podido eliminar la tarea'
            }
        }
    }
}


export async function markCompleteTask(taskId: number) {
    try {

        await Task.update({
            completed: true,
            date_completed: moment().date().toString()
        }, {
            where: {
                id: taskId
            }
        });

        return { 
            status: true,
            data: {
                message: 'Tarea marcado como completada'
            }
        }
    } catch (error) {
        console.log(error);
        return { 
            status: false,
            data: {
                message: 'No se ha podido marcar como completada la tarea'
            }
        }
    }
}


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

   let myTasks = await UserTask.findAll({
    where: {
        [Op.or]: [
            { user_id: userId },
            { user_asigned: userId }
        ]
    },
    order: [
        ['id', 'ASC']
    ],
    // offset: 5,
    // limit: 5
   });

    let allTasks = [];

    await Promise.all([...myTasks].map(async item => {

        let userOwnerId = item.user_id;
        let userAsignedId = item.user_asigned;

        let taskById = await getTaskById(item.task_id);
        let user_owner = await getUserById(userOwnerId);
        let user_asigned = await getUserById(userAsignedId);

        let taskWithUsers = {
            ...taskById,
            user_owner,
            user_asigned
        }
        allTasks.push(taskWithUsers);
    }))
    
    return {
        status: true,
        data: allTasks
    }

    } catch (error) {
        console.log(error);
        return {
            status: false,
            data: {
                message: 'Error. No se pudo obtener las tareas'
            }
        }
    }
}

export async function getTaskById(taskId: number) {
    let task = await Task.findOne({
        where: {
            id: taskId
        }
    });

    if(!task) return null;

    return task.dataValues;
}