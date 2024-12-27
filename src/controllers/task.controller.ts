import { NextFunction, Request, Response } from "express";
import { getProfileByEmail } from "../dto/userDto";
import MESSAGE_RESPONSE from "../helpers/message";
import { createTask } from "../dto/task.Dto";


export async function createTaskController(req: Request, res: Response, next: NextFunction) {
    try {
        let data = req.body;
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
