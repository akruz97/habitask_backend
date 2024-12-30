import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { UserTask } from '../models/user_task.model';

const dialectDB = process.env.DIALECT || '';
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
let option: SequelizeOptions = {};
let models = [
    User,
    Task,
    UserTask
    ];

if (process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "local") {
    console.log('process.env.NODE_ENV: '+process.env.NODE_ENV);
    option = {
        dialect: 'postgres',
        host: DB_HOST,
        port: 5432,
        database: DB_NAME,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        ssl: true,
        models: models
    }
} else {
    option = {
        dialect: 'postgres',
        host: DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        logging: false,
        port: 5432,
        dialectOptions: {
            ssl: {
               require: true,
               rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        ssl: true,
        models: models
    }
}


export const connection = new Sequelize(option);

async function connectionDB() {
    try {
        console.log('connecting...');
        await connection.sync();
        console.log('conexion exitosa...')
    } catch (error) {
        console.log("error en la conexion de db...")
        console.log(error);
    }
}

export default connectionDB;