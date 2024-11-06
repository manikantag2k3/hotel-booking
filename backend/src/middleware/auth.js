import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies["auth_token"];
  console.log("Token received:", token); // Add this line
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Token verification error:", error); // Add this line
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
