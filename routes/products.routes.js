import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createProducts,
  getProducts,
  getSingleProducts,
  uploadImage,
} from "../controllers/products.controller.js";

const router = express.Router();

const dir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      file.fieldname +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    req.body.image = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post("/create", upload.single("image"), createProducts);
router.post("/uploadImage", upload.single("image"), uploadImage);

router.use("/uploads", express.static(dir));

router.get("/get", getProducts);
router.get("/getSingleProduct/:id", getSingleProducts);

router.delete("/delete/:id", (req, res) => {
  res.send("Delete product logic not implemented");
});

export default router;
