import { Router } from "express";
import { CheckAuthToken } from "../controllers/auth.controller";
import { getUserProfileController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/profile', CheckAuthToken, getUserProfileController)

export default userRouter;