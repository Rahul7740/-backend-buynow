import db from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { passwordSchema } from "../validation/passwordValidation.js";
import { emailSchema } from "../validation/emailValidatoin.js";
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, "d4f5efe5f4e5f", {
    expiresIn: "2h",
  });
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await db.User.findOne({ where: { email: email } });
    if (checkEmail) {
      return res.status(404).json({ error: "user email already exists" });
    }
    await emailSchema.validate({ email });
    await passwordSchema.validate({ password });
    const selt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, selt);
    let fullName = name.split(" ");
    const data = await db.User.create({
      firstName: fullName[0],
      lastName: fullName[1],
      email,
      password: hashedPass,
    });
    const token = generateToken(data);
    res.status(200).json({ data, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const checkUser = await db.User.findOne({ where: { email: email } });
    if (!checkUser) {
      return res.status(400).json({ error: "check your email" });
    }
    const checkOLdPass = await bcrypt.compare(oldPassword, checkUser.password);
    if (!checkOLdPass) {
      return res.status(400).json({ error: "Old password does not match" });
    }
    const checkNewPass = await bcrypt.compare(newPassword, checkUser.password);
    if (checkNewPass) {
      return res
        .status(404)
        .json({ error: "New password cannot be the same as the old password" });
    }
    await passwordSchema.validate({ password: newPassword });
    const hashnewPass = await bcrypt.hash(newPassword, 10);

    const userData = await db.User.update(
      { password: hashnewPass },
      { where: { email } }
    );
    const token = generateToken(userData);
    res.status(200).json({ message: "update sucessfully", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await db.User.findOne({ where: { id: id } });
    if (!checkUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await checkUser.destroy();
    res.status(200).json({ message: "user Deleted", id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const data = await db.User.findAll();
    res.status(404).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await db.User.findOne({ where: { email: email } });
    if (!checkEmail) {
      return res.status(404).json({ error: "please enter valid email" });
    }

    const passCheck = await bcrypt.compare(password, checkEmail.password);
    if (!passCheck) {
      return res.status(404).json({ error: "wrong password" });
    }
    res.status(202).json({ message: "login successful", data: checkEmail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const emailCheck = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await db.User.findOne({ where: { email: email } });
    if (!checkEmail) {
      return res.status(404).json({ error: "email does not exists" });
    }
    res.status(200).json({ message: "email exists" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const ResetPass = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const checkUser = await db.User.findOne({ where: { email: email } });
    if (!checkUser) {
      return res.status(400).json({ error: "check your email" });
    }

    const checkNewPass = await bcrypt.compare(newPassword, checkUser.password);
    if (checkNewPass) {
      return res
        .status(404)
        .json({ error: "New password cannot be the same as the old password" });
    }
    await passwordSchema.validate({ password: newPassword });
    const hashnewPass = await bcrypt.hash(newPassword, 10);

    const userData = await db.User.update(
      { password: hashnewPass },
      { where: { email } }
    );
    const token = generateToken(userData);
    res.status(200).json({ message: "update sucessfully", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserAllData = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNo,
      address,
      secondAddress,
      State,
      Gender,
    } = req.body;
    const checkEmail = await db.User.findOne({ where: { email: email } });
    if (!checkEmail) {
      return res.status(400).json({ error: "check your email" });
    }
    await db.User.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        address: address,
        secondAddress: secondAddress,
        State: State,
        Gender: Gender,
      },
      { where: { id: checkEmail.id } }
    );
    res.status(200).json({ message: "update succesfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await db.User.findOne({ where: { id: id } });
    if (!checkId) {
      return res.status(444).json({ error: "productsId is not avalible" });
    }
    res.status(200).json(checkId);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// export const UpdateProfile = async (req, res) => {
//   try {
//     const { email, profile } = req.body;

//     const checkId = await db.User.findOne({ where: { email: email } });
//     if (!checkId) {
//       return res.status(444).json({ error: "email not exist" });
//     }
//     await db.User.update({ profile }, { where: { email } });
//     res.status(200).json({ message: "upload sucessfully", email, profile });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

export const UpdateProfile = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    const profilePath = req.file ? req.file.filename : null;
    if (!profilePath) {
      return res.status(400).json({ error: "File upload failed" });
    }

    await db.User.update({ profile: profilePath }, { where: { email } });
    res.status(200).json({
      message: "Upload successful",
      email,
      profile: profilePath,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
