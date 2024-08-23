import express from "express"
import { getOrder, postOrder, delOrder } from "../controller/orderController"
import { verifyToken } from "../middleware/authorization"
import { verifyAddOrder } from "../middleware/verifyOrder"

const app = express()

app.use(express.json())

app.get(`/order`, [verifyToken], getOrder)
app.post(`/order`,[verifyAddOrder], postOrder)
app.delete(`/order/:id`, delOrder)

export default app