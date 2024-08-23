import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs"
import { BASE_URL } from "../global";

const prisma = new PrismaClient()

export const getCoffee = async (request: Request, response: Response) => {
    try {
        const { search } = request.query

        const allCoffee = await prisma.coffee.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response
            .json({
                status: true,
                data: allCoffee,
                message: `Coffee has been loaded`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const postCoffee = async (request: Request, response: Response) => {
    try {
        const { name, size, price } = request.body

        let filename = ""
        if (request.file) filename = request.file.filename

        const newCoffee = await prisma.coffee.create({
            data: {
                name, size, price: Number(price), image: filename
            }
        })

        return response
            .json({
                status: true,
                data: newCoffee,
                message: `Coffee has been created`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const putCoffee = async (request: Request, response: Response) => {
    try {
        const id = request.params.id
        const { name, size, price } = request.body

        const findCoffee = await prisma.coffee.findFirst({
            where: { id: Number(id) }
        })

        if (!findCoffee)
            return response
                .json({
                    status: false,
                    message: `Coffee is not found`
                }).status(200)

        let filename = findCoffee.image

        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/public/coffee-image/${findCoffee.image}`
            let exists = fs.existsSync(path)
            if (exists && findCoffee.image !== ``) fs.unlinkSync(path)
        }

        const updateCoffee = await prisma.coffee.update({
            data: {
                name: name || findCoffee.name,
                size: size || findCoffee.size,
                price: price?Number(price): findCoffee.price,
                image: filename 
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updateCoffee,
            message: `Coffee has been update`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const delCoffee = async (request: Request, response: Response) => {
    try {
        const id = request.params.id

        const findCoffee = await prisma.coffee.findFirst({
            where: { id: Number(id) }
        })

        if (!findCoffee)
            return response
                .json({
                    status: false,
                    message: `Coffee is not found`
                }).status(200)

        let path = `${BASE_URL}/public/coffee-image/${findCoffee.image}`
        let exists = fs.existsSync(path)
        if (exists && findCoffee.image !== ``) fs.unlinkSync(path)

        const deleteCoffee = await prisma.coffee.delete({
            where: {id: Number(id)}
        })

        return response
        .json({
            status: true,
            data: deleteCoffee,
            message: `Coffee has been delete`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}