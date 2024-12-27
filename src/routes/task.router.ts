import { Router } from "express";
import { CheckAuthToken } from "../controllers/auth.controller";
import { createTaskController, getMyTasksController } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get('/all', CheckAuthToken, getMyTasksController)
taskRouter.post('/create', CheckAuthToken, createTaskController)


export default taskRouter;