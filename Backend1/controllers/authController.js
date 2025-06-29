const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.SECRET_kEY,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    res.cookie("jwt", token, {
      maxAge: parseInt(process.env.COOKIE_EXPIRY),
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    res.status(200).json({ message: "login successfull" });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.status(200).json({ message: "Logout successfull" });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, name, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const userUser = await User.create({ email, name, password, role });
    res.status(201).json({ message: "User created", data: userUser });
  } catch (err) {
    next(err);
  }
};
const verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: "Unauthorized.Please login!.." });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_kEY);
    const user = await User.findById(decodedData.id);
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }
    res.status(200).json({
      message: "Authenticated User",
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, verify };
