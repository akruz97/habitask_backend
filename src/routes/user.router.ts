import { Router } from "express";
import { CheckAuthToken } from "../controllers/auth.controller";
import { 
    getUserProfileController,
    getListUsersController
} from "../controllers/user.controller";


const userRouter = Router();

userRouter.get('/all', CheckAuthToken, getListUsersController)
userRouter.get('/profile', CheckAuthToken, getUserProfileController)

export default userRouter;