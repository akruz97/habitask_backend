import { Router } from "express";
import { CheckAuthToken } from "../controllers/auth.controller";
import { createTaskController, deleteTaskController, getMyTasksController, markCompleteTaskController } from "../controllers/task.controller";

const taskRouter = Router();


taskRouter.get('/all', CheckAuthToken, getMyTasksController)
taskRouter.get('/delete/:id', CheckAuthToken, deleteTaskController)
taskRouter.post('/create', CheckAuthToken, createTaskController)
taskRouter.put('/markAsComplete/:id', CheckAuthToken, markCompleteTaskController)

export default taskRouter;