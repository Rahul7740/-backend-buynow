import express from "express";
import userRouter from "./user.routes.js";
import productsRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);

export default router;
