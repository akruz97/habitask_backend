import { NextFunction, Request, Response } from 'express';

export const validateRequest = (schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = schema.validate(req.body);
        if (data.error) {
            return res.status(400).json({
                error: data.error.details.map((err:any) => err.message),
            });
        }
        next();
    }
}