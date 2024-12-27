import { Router } from "express";
import { validateRequest } from '../helpers/validationBodyRequest';
import { createUserValidationSchema } from '../helpers/validations'
import { createUserController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/register', validateRequest(createUserValidationSchema) , createUserController);
// authRouter.get('/login', async(req, res) => { return res.json({ status: true, message: 'ok' }) });

export default authRouter;