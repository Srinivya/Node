const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  age: {
    type: Number,
    min: [18, "Age must be greater than 18"],
  validate:{
    validator:Number.isInteger,
    message:"Email must be a string"
  }
  },
  isMarried: Boolean,
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
    match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Enter format mail"]
  }
});

const User = model("User", UserSchema);

module.exports = User;
