import { Router } from "express";
import { CheckAuthToken, createUserController, loginUserController } from "../controllers/auth.controller";

const userRouter = Router();

userRouter.get('/profile', CheckAuthToken, loginUserController)

export default userRouter;