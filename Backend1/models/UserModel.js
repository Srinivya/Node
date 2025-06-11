const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  age: {
    type: Number,
    min: [18, "Age must be greater than 18"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter format mail"],
  },
  role:{
    type:String,
    enum:["user","admin","super-admin"],
    required:[true,"Role is required"]
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = model("User", UserSchema);

module.exports = User;
