const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    
  },
  description: {
    type: String,
    maxlength: [150, "Description must have the length of less than 150"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    enum: ["men's-clothing", "jewelery", "electronics", "women's-clothing"],
    required: [true, "category is required"],
  },
  image: {
    type: String,
  },
  rating: {
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
    },
  },
});

const Product = model("Product", ProductSchema);
module.exports = Product;
