const User = require("../models/UserModel");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "success", data: users });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    console.log(user.password);
    res.status(200).json({ message: "success", data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const existing = await User.findOne({ name: userData.name });
    if (existing) {
      return res.status(500).json({ message: "User already found" });
    }

    const userUser = await User.create(userData);
    res.status(201).json({ message: "User created", data: userUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const UserData = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { email: UserData.email },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
         return res
      .status(404)
      .json({ message: "user not found" });
    }
    return res
      .status(200)
      .json({ message: "Updated successfully", data: updateUser });
  } catch (e) {
    res.status(500).json({ message: e.message }, { user: updateUser });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Deleted User", data: deleteUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
