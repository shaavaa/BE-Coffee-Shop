import express from "express"
import { getAdmin, postAdmin, putAdmin, delAdmin, authentication } from "../controller/adminController"
import { verifyToken } from "../middleware/authorization"
import { verifyAddAdmin, verifyAuthentication, verifyEditAdmin } from "../middleware/verifyAdmin"

const app = express()

app.use(express.json())

app.get(`/admin`, [verifyToken], getAdmin)
app.post(`/admin`, [verifyToken,verifyAddAdmin], postAdmin)
app.put(`/admin/:id`,[verifyToken, verifyEditAdmin], putAdmin)
app.delete(`/admin/:id`, [verifyToken], delAdmin)
app.post(`/auth`, [verifyAuthentication], authentication)

export default app