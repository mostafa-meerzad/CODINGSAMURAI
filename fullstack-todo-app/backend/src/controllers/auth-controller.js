import User from "../models/user-model.js";
import { generateToken } from "../utils/generateToken.js";
import { loginSchema, userSchema } from "../validators/user-validator.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((error) => ({ message: error.message })),
      });
    }

    const user = await User.findOne({ email: value.email });

    if (user) return res.status(400).json({ message: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    const newUser = new User({ ...value });
    newUser.password = hashedPassword;

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res
        .status(201)
        .json({ id: newUser._id, name: newUser.name, email: newUser.email });
    } else {
      return res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    console.log("server error in sign-up controller ", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((error) => ({ message: error.message })),
      });
    }

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    generateToken(user._id, res);
    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.log("server error in login controller", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "successfully logged out" });
};
