import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const addDataSchema = Joi.object({
    name: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().min(1).required(),
    image: Joi.allow().optional()
})

const updateDataSchema = Joi.object({
    name: Joi.string().optional(),
    size: Joi.string().optional(),
    price: Joi.number().min(1).optional(),
    image: Joi.allow().optional()
})

export const verifyAddCoffee = (request: Request, response: Response, next: NextFunction) => {
    const {error} = addDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}

export const verifyEditCoffee = (request: Request, response: Response, next: NextFunction) => {
    const {error} = updateDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}