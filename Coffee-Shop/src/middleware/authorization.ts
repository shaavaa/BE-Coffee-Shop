import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.headers.authorization

        if(header) {
            let [key, token] = header.split(" ")
            const secret = process.env.JWT_SECRET_KEY || ""
            if(verify(token, secret)) {
                return next()
            }
        }

        return response
            .json({
                status: false,
                message: `Unauthorized. Please include verified token`
            }).status(401)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}