import { NextFunction, Request, Response } from "express";
import { getProfileByEmail } from "../dto/userDto";
import MESSAGE_RESPONSE from "../helpers/message";


export async function getUserProfileController(req: Request, res: Response, next: NextFunction) {
    try {
        let email = req.user.email;
        console.log('data: ',email);
        let response = await getProfileByEmail(email);
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}