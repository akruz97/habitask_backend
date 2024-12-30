import { ILogin } from "../interfaces/user";
import MESSAGE_RESPONSE from "../helpers/message";
import { EncryptPass, VerifyPass } from "../helpers/security";
import { User } from "../models/user.model"
import { CreateJwtToken } from "../helpers/jsonWebToken";


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
                message: MESSAGE_RESPONSE.SIGNUP_USER_ERROR
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

        let user = await getUserByEmail(data.email);

        if(!user || !VerifyPass(data.password, user.password)){
            return {
                status: false,
                data: {
                    message: 'Error de usuario o password'
                }
            }
        }

        let token: any = CreateJwtToken({
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            id: user.id
        });

        return {
            status: true,
            data: {
                message: 'Autenticación exitosa',
                token,
                mode: 'UP'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            data: {
                message: 'Error al autenticar'
            }
        }
    }
}

export async function getProfileByEmail(email: string) {
    try {
        let user = await getUserByEmail(email);

        if(!user) {
            return {
                status: false,
                data: {
                    message: MESSAGE_RESPONSE.USER_NOT_FOUND
                }
            }
        }


        return {
            status: true,
            data: {
                id: user.dataValues.id,
                name: user.dataValues.name,
                lastname: user.dataValues.lastname,
                email: user.dataValues.email,
            }
        }


    } catch (error: any) {
        console.log(error);
        return {
            status: false,
            data: {
                message: MESSAGE_RESPONSE.ERR0R_UNKNOW
            }
        }
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

export async function getUserById(userId: number) {
    let user = await User.findOne({
        where: {
            id: userId
        },
        attributes: ['id', 'name', 'lastname', 'email']
    });

    if(!user) return null;

    return user.dataValues;
}


export async function getListUsers() {
    let users = await User.findAll({
        attributes: ['id', 'name', 'lastname']
    });
    console.log(users);
    if(!users.length) {
        return {
            status: false,
            data: []
        };
    }

    return {
        status: true,
        data: [...users]
    };
}
