import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // generate the token
  const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d" });

  // send token in the cookies
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevents XSS cross-site scripting attacks
    sameSite: "strict", // prevents CSRF cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
