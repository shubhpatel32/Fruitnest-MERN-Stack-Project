const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  // console.log(jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log(isVerified);

    const userData = await User.findOne({ _id: isVerified.userId }).select({
      password: 0,
    });

    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

const authMiddleware2 = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, login again!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = token_decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "error" });
  }
};

module.exports = { authMiddleware, authMiddleware2 };
