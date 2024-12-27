import Joi from 'joi';

export const createUserValidationSchema = Joi.object().keys({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});