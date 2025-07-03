import connectToDb from "./db/db.js";
import User from "./models/user.model.js";
import bcrypt from "bcrypt";
const userRegister = async () => {
  try {
    connectToDb();
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin12@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
