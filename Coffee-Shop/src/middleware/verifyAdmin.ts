import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const addDataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const updateDataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const authSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const verifyAddAdmin = (request : Request, response: Response, next: NextFunction) => {
    const {error} = addDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .json({
            status: false,
            message: error.details.map(it=> it.message).join()
        }).status(400)
    }
    return next()
}

export const verifyEditAdmin = (request: Request, response: Response, next: NextFunction) => {
    const {error} = updateDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it=> it.message).join()
        })
    }
    return next()
}

export const verifyAuthentication = (request: Request, response: Response, next: NextFunction) => {
    const {error} = authSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it=> it.message).join()
        })
    }
    return next()
}