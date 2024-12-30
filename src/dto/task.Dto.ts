import { Task } from "../models/task.model";
import { ITask } from "../interfaces/task";
import moment from "moment";
import MESSAGE_RESPONSE from "../helpers/message";
import { getUserById } from "./userDto";
import { Op } from "sequelize";


export async function deleteTask(taskId: number, userId: number) {
    try {

        let task = await Task.findOne({
            where: {
                id: taskId
            }
        });


        if(task.user_id !== userId){
            return { 
                status: false,
                data: {
                    message: MESSAGE_RESPONSE.UNHAUTHORIZED_TASK_DELETE
                }
            }
        }

        if(task.dataValues && !task.dataValues.completed){
            await task.destroy();
            
            return { 
                status: true,
                data: {
                    message: MESSAGE_RESPONSE.SUCCESS_TASK_DELETED
                }
            }
        }

        return { 
            status: false,
            data: {
                message: MESSAGE_RESPONSE.CANT_NOT_TASK_DELETED
            }
        }

      

    } catch (error) {
        return { 
            status: false,
            data: {
                message: MESSAGE_RESPONSE.ERROR_TASK_DELETED
            }
        }
    }
}


export async function markCompleteTask(taskId: number) {
    try {

        await Task.update({
            completed: true,
            date_completed: moment().format()
        }, {
            where: {
                id: taskId
            }
        });

        return { 
            status: true,
            data: {
                message: MESSAGE_RESPONSE.TASK_MARKED_COMPLETED
            }
        }
    } catch (error) {
        return { 
            status: false,
            data: {
                message: MESSAGE_RESPONSE.ERROR_TASK_MARKED_COMPLETED
            }
        }
    }
}


export async function createTask(data: ITask) {

    try {

    let newTask = await Task.create({
        title: data.title,
        completed: data.completed,
        created: moment().format(),
        user_id: data.user_id,
        user_asigned_id: data.user_asigned_id
    });

    if(newTask.dataValues){
        return {
            status: true,
            data: {
                message: MESSAGE_RESPONSE.CREATED_TASK_SUCCESS,
                ...newTask.dataValues
            }
        }
    }

    } catch (error) {
        return {
            status: true,
            data: {
                message: MESSAGE_RESPONSE.CREATED_TASK_ERROR
            }
        }
    }
}

export async function getMyTasks(userId: number, offset: any, limit: any) {
    try {

   let taskFilter = await Task.findAll({
        where: { 
            [Op.or]: [
                {
                    user_id: userId,
                   
                },
                {
                    user_asigned_id: userId
                }
            ]
         },
        attributes: ['id', 'title', 'completed', "user_id" ,    "user_asigned_id"],
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [
            ['id', 'ASC']
        ]
   });



    let allTasks = [];

    await Promise.all([...taskFilter].map(async item => {

        let userOwnerId = item.user_id;
        let userAsignedId = item.user_asigned_id;

        let taskById = await getTaskById(item.id);
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
        data: [...allTasks]
    }

    } catch (error) {
        console.log(error);
        return {
            status: false,
            data: {
                message: MESSAGE_RESPONSE.ERROR_LIST_TASKS
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