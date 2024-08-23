import express, { Request, Response } from "express"
import path from "path"
import cors from "cors"
import adminRoute from "./route/adminRoute"
import coffeeRoute from "./route/coffeeRoute"
import orderRoute from "./route/orderRoute"

const app = express()

const PORT = 8080

app.use(express.json())

app.use(adminRoute)
app.use(coffeeRoute)
app.use(orderRoute)

app.listen(PORT, () => {
    console.log(`Server coffe shop running on port ${PORT}`);
})