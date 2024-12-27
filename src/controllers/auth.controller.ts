import { NextFunction, Request, Response } from "express";
import { createUser, getUserByEmail, loginUser } from "../dto/userDto";
import MESSAGE_RESPONSE from "../helpers/message";
import { CheckJwtToken } from "../helpers/jsonWebToken";


export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        let data = req.body
        console.log('data: ',data);
        let response = await createUser(data);
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}

export async function loginUserController(req: Request, res: Response, next: NextFunction) {
    try {
        let data = req.body
        console.log('data: ',data);
        let response = await loginUser(data);
        return res.json({...response });
    } catch (error) {
        console.log(error);
        return res.json({
            message: MESSAGE_RESPONSE.ERR0R_UNKNOW
        })
    }
}


export async function CheckAuthToken(req: Request, res: Response, next: NextFunction) { 
    try {
        const dataToken: any = CheckJwtToken(req.header('x-token') || '');
        if (dataToken) {
            let dataUser = await getUserByEmail(dataToken.email);

            if (dataUser) {
                req.user = {
                    id: dataUser.id,
                    email: dataUser.email,
                    name: dataUser.name,
                    lastname: dataUser.lastname
                }
                next();
            }
        } else {
            return res.json({
                msj: 'Token incorrecto'
            });            
        }

    } catch (error) {
        console.log(error);
        return res.json({
            msj: 'Token incorrecto'
        });
    }
}