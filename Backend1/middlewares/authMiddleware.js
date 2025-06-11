const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(400).json({ message: "session Epired, Login again" });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_kEY);
    req.user = decodedData;
    next();
  } catch (err) {
    next(err);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "access denied",
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
