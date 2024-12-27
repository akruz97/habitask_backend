import Joi from 'joi';

export const createUserValidationSchema = Joi.object().keys({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});