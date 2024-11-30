import express from "express";
import {
  cartCreate,
  cartGet,
  cartRemove,
  updateQty,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/create", cartCreate);
router.delete("/remove/:id", cartRemove);
router.get("/get", cartGet);
router.put("/updateQty",updateQty)

export default router;
