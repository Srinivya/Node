const Product = require("../models/ProductModel");

exports.getProducts = async (req, res) => {
  try {
    const getProducts = await Product.find();
    return res.status(200).json({ message: "Get Product", data: getProducts });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const {productId} =req.params;
    const getProductById = await Product.findById(productId);
    return res
      .status(200)
      .json({ message: "Product by id", data: getProductById });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const ProductData = req.body;
    const existing = await Product.findOne({ title: ProductData.title });
    if (existing) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const createProduct = await Product.create(ProductData);
    return res
      .status(200)
      .json({ message: "Product created", data: createProduct });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const ProductData = req.body;
    const {productId}=req.params;
    const updateProduct = await Product.findByIdAndUpdate(productId,ProductData,{new:true,runValidators:true});
     if (!updateProduct) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Product Updated", data: updateProduct });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const {productId} =req.params;
   
    const deleteProduct = await Product.findByIdAndDelete(productId);
     if (!deleteProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Product deleted", data: deleteProduct });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
