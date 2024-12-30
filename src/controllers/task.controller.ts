import { NextFunction, Request, Response } from "express";
import { getProfileByEmail } from "../dto/userDto";
import MESSAGE_RESPONSE from "../helpers/message";
import { createTask, deleteTask, getMyTasks, markCompleteTask } from "../dto/task.Dto";
import { parse } from "path";


export async function createTaskController(req: Request, res: Response, next: NextFunction) {
    try {
        let data = req.body;
        data.user_id = req.user.id;
        console.log('data: ',data);
        let response = await createTask(data);
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}

export async function deleteTaskController(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params;
        let userId = req.user.id;
        console.log('data: ',id);
        let response = await deleteTask(parseInt(id), userId);
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}

export async function markCompleteTaskController(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params;

        let response = await markCompleteTask(parseInt(id));
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}

export async function getMyTasksController(req: Request, res: Response, next: NextFunction) {
    try {
        let userId = req.user.id;
        console.log('userId: ',userId);
        let response = await getMyTasks(userId);
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}
