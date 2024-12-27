import { Router } from 'express';
import AuthRouter from './auth.router';
import UserRouter from './user.router';
import TaskRouter from './task.router';

declare module 'express-serve-static-core' {
    interface Request {
        user: {
            id: any;
            email: string;
            name: string;
            lastname: string
        };
    }
}

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/user', UserRouter);
ApiRouter.use('/task', TaskRouter);

export default ApiRouter;