import { Router } from "express";
import { CheckAuthToken } from "../controllers/auth.controller";
import { 
    getUserProfileController,
    getListUsersController
} from "../controllers/user.controller";


const userRouter = Router();

userRouter.get('/profile', CheckAuthToken, getUserProfileController)
userRouter.get('/all', CheckAuthToken, getListUsersController)

export default userRouter;