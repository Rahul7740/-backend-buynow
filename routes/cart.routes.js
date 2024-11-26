import express from "express";
import {
  cartCreate,
  cartGet,
  cartRemove,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/create", cartCreate);
router.delete("/remove", cartRemove);
router.get("/get", cartGet);

export default router;
