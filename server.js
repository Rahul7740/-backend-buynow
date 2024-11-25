import express from "express";
import MainRouter from "./routes/MainRouter.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", MainRouter);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
