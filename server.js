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

// function mystery(x, y) {
//   return x * y + x / y;
// }
// console.log(mystery(10,5));
//------------------------------------------------------
// let a = [1, 2, 3];
// let b = a;
// b.push(4);
// console.log(a);
//------------------------------------------------------
let foo = "bar";
(function () {
  let foo = "baz";
  console.log(foo);
})();
console.log(foo);

//------------------------------------------------------
console.log(+"5");
console.log("5" - 2);
console.log("5" + 2);

//------------------------------------------------------
