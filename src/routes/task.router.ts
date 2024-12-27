import { Router } from "express";
import { CheckAuthToken } from "../controllers/auth.controller";
import { createTaskController } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.post('/create', CheckAuthToken, createTaskController)

export default taskRouter;