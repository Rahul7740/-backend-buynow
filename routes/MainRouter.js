import express from 'express';
import userRouter from "./user.routes.js"
import productsRouter from "./products.routes.js"

const router = express.Router()

router.use("/user",userRouter)
router.use("/products",productsRouter)

export default router