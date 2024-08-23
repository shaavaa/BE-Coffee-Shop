import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAdmin = async (request: Request, response: Response) => {
    try {
        const { search } = request.query

        const allAdmin = await prisma.admin.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response
            .json({
                status: true,
                data: allAdmin,
                message: `Admin has been loaded`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const postAdmin = async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body

        const newAdmin = await prisma.admin.create({
            data: {
                name, email, password: md5(password)
            }
        })

        return response
            .json({
                status: true,
                data: newAdmin,
                message: `Admin has been created`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const putAdmin = async (request: Request, response: Response) => {
    try {
        const id = request.params.id

        const { name, email, password } = request.body

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        if (!findAdmin)
            return response
                .json({
                    status: false,
                    message: `Admin not found`
                }).status(200)

        const updateAdmin = await prisma.admin.update({
            where: { id: Number(id) },
            data: {
                name: name || findAdmin.name,
                email: email || findAdmin.email,
                password: password ? md5(password) : findAdmin.password
            }
        })

        return response
            .json({
                status: true,
                data: updateAdmin,
                message: `Admin has been update`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const delAdmin = async (request: Request, response: Response) => {
    try {
        const id = request.params.id

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        if (!findAdmin)
            return response
                .json({
                    status: false,
                    message: `Admin not found`
                }).status(200)

        const deleteAdmin = await prisma.admin.delete({
            where: { id: Number(id) }
        })

        return response
            .json({
                status: true,
                data: deleteAdmin,
                message: `Admin has been delete`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const authentication = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body

        const findAdmin = await prisma.admin.findFirst({
            where: { email, password: md5(password) }
        })

        if (!findAdmin)
            return response
                .json({
                    status: false,
                    logged: false,
                    message: `Email or password is invalid`
                }).status(200)

        let payload = JSON.stringify(findAdmin)

        let secretKey = process.env.JWT_SECRET_KEY

        let token = sign(payload, secretKey || "darrel")

        return response
            .json({
                status: true,
                logged: true,
                message: `Login success`,
                token
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}