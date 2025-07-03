import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
    try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ sucess: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ sucess: false, error: "Wrong old password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    const newUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { password: hashPassword }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password change successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, error: "Setting error" });
  }
};

export { changePassword };
