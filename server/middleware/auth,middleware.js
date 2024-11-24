import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      res.status(404).json({
        message: "Invalid token",
      });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};
