import { ILogin } from "../interfaces/user";
import MESSAGE_RESPONSE from "../helpers/message";
import { EncryptPass, VerifyPass } from "../helpers/security";
import { User } from "../models/user.model"



export async function createUser(data: any) {
    try {
        console.log(data);
        let existUser = await getUserByEmail(data.email);

        if(existUser) {
            return {
                status: false,
                data: {
                    message: MESSAGE_RESPONSE.EXISTE_USER
                }
            }
        }

        let createUser = await User.create({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: EncryptPass(data.password),
        })

        if(createUser){
            return {
                status: true,
                data: {
                    message: MESSAGE_RESPONSE.SIGNUP_USER_SUCCESS
                }
            }
        }

    } catch (error: any) {
        console.log(error);
        return {
            status: false,
            data: {
                // message: error.response.message
            }
        }
    }
}

export async function loginUser(data: ILogin) {
    try {
        if(!data.email || !data.password){
            return {
                status: false,
                data: {
                    message: 'Los campos son obligatorios'
                }
            }
        }

        let user = await gettUserByEmail(data.email);

        if(!user || !VerifyPass(data.password, user.password)){
            return {
                status: false,
                data: {
                    message: 'Error de usuario o password'
                }
            }
        }


    } catch (error) {
        
    }
}

export async function getUserByEmail(email: string) {
    let user = await User.findOne({
        where: {
            email: email
        }
    });

    if(!user) return null;

    return user;
}