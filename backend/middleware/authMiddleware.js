import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          success: false,
          error: "Authorization header missing or invalid",
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token Not Provided" });
    }
    // console.log("Extracted Token:", token); 
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not valid" });
    }

    const user = await User.findById({ _id: decoded._id }).select("-password");
    req.user = user;
    next();

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, error: "Internal sever error" });
  }
};

export default verifyUser;
