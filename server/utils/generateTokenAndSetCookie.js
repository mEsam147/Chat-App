import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return token;
};
