import express from "express";
import MainRouter from "./routes/MainRouter.js";
import cors from "cors";

import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", MainRouter);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});

// fs.writeFileSync("./abc.txt" , "ahsdfdfk")
// let abc =  fs.readFileSync("./abc.txt" , "utf-8")
// console.log(abc);

// let sync =  fs.readFileSync("./abc.txt" , "utf-8",(err,data)=>{})

// console.log(sync , "<==========");

// class abc {

// }
// console.log(typeof abc);


