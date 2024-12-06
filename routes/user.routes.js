import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createUser,
  deleteUser,
  emailCheck,
  getSingleUser,
  getUser,
  loginUser,
  ResetPass,
  UpdateProfile,
  updateUser,
  updateUserAllData,
} from "../controllers/user.controller.js";

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
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post("/create", createUser);
router.post("/uploadProfile", upload.single("profile"), UpdateProfile);
router.post("/login", loginUser);
router.post("/emailCheck", emailCheck);
router.put("/update", updateUser);
router.put("/passupdate", ResetPass);
router.put("/updateAllData", updateUserAllData);
router.delete("/delete/:id", deleteUser);
router.get("/get", getUser);
router.get("/getSingleUser/:id", getSingleUser);

export default router;

/**
=======register: ,createUser=======
api: http://localhost:5000/api/user/create
Data:{
    name:"",
    email:"",
    password:""
}
email-verify-enter-> otp

res:{
    "data": {
        "id": 8,
        "name": "Rahul123",
        "email": "RahulTaak123@gmail.com",
        "password": "$2b$10$d1IETPFtRnjUH/a7xm3yge8Kk3zIIm5fVwZs48Tz72jpZcEsSPp5i",
        "updatedAt": "2024-10-23T14:04:38.388Z",
        "createdAt": "2024-10-23T14:04:38.388Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJSYWh1bFRhYWsxMjNAZ21haWwuY29tIiwiaWF0IjoxNzI5NjkyMjc4LCJleHAiOjE3Mjk2OTk0Nzh9.JLo7I3GzS-7obikbb_MCbDGNVqKTQgJA7M-KM1pHyrQ"
}

==========update=======
api: http://localhost:5000/api/user/update
data:{
    email:"efef@gmail.com",
    oldPassword:"Rahuile!4f",
    newPassword:"FEfkejmf@1f5"
}

==========delete:=======
api : http://localhost:5000/api/user/delete/1

res : "delete sucessfully"


==========login:=======
api : http://localhost:5000/api/user/login
Data :{
    email:"",
    password:""
}


==========Forget:=======
Data : {
    email:""
}
check otp

data: {newPassword:""}



*/
