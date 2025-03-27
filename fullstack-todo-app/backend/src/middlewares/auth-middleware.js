import jwt from "jsonwebtoken";
import User from "../models/user-model";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "no token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "no token provided" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "user not found" });

    req.user = user;

    next();
  } catch (error) {
    console.log("error in auth middleware");
    return res.status(500).json({ message: "internal server error" });
  }
};
