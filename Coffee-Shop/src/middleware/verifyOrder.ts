import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const orderDetailSchema = Joi.object({
    // order_id: Joi.number().required(),
    coffee_id: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(1).required()
})

const addDataSchema = Joi.object({
    customer_name: Joi.string().optional(),
    order_type: Joi.string().optional(),
    order_date: Joi.string().optional(),
    order_detail: Joi.array().items(orderDetailSchema).min(0).required()
})

export const verifyAddOrder = (request: Request, response: Response, next: NextFunction) => {
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