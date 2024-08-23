import express from "express"
import { getCoffee, postCoffee, putCoffee, delCoffee } from "../controller/coffeeController"
import { verifyToken } from "../middleware/authorization"
import { verifyAddCoffee, verifyEditCoffee } from "../middleware/verifyCoffee"
import { uploadFile } from "../middleware/uploadImageOfCoffee"

const app = express()

app.use(express.json())

app.get(`/coffee`, getCoffee)
app.post(`/coffee`,[verifyToken, uploadFile.single("image"),verifyAddCoffee], postCoffee)
app.put(`/coffee/:id`, [verifyToken, uploadFile.single("image"), verifyEditCoffee], putCoffee)
app.delete(`/coffee/:id`, [verifyToken], delCoffee)

export default app