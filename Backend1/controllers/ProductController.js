const Product = require("../models/ProductModel");

exports.getProducts = async (req, res,next) => {
  try {
    const getProducts = await Product.find();
    return res.status(200).json({ message: "Get Product", data: getProducts });
  } catch (err) {
   next(err)
  }
};

exports.getAllProducts = async (req, res,next) => {
  try {
    const {
      page = 1,
      limit = 5,
      category,
      search,
      minRating,
      minPrice,
      maxPrice,
    } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (minRating) {
      query["rating.rate"] = { $gte: parseInt(minRating) };
    }

    if (minPrice) {
      query.price = { $lte: parseInt(minPrice) };
    }
    if (maxPrice) {
      query.price = { $gte: parseInt(maxPrice) };
    }

    const total = await Product.countDocuments(query);
    console.log(total);

    const skipNumber = (page - 1) * limit;
    const limitNumber = parseInt(limit);

    const products = await Product.find(query)
      .skip(skipNumber)
      .limit(limitNumber);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),

      products,
    });
  } catch (err) {
   next(err)
  }
};

exports.getProductById = async (req, res,next) => {
  try {
    const { productId } = req.params;
    const getProductById = await Product.findById(productId);
    return res
      .status(200)
      .json({ message: "Product by id", data: getProductById });
  } catch (err) {
   next(err)
  }
};

exports.createProduct = async (req, res,next) => {
  try {
    const productData = req.body;
    const existing = await Product.findOne({ title: productData.title });
    if (existing) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const createProduct = await Product.create(productData);
    return res
      .status(200)
      .json({ message: "Product created", data: createProduct });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res,next) => {
  try {
    const productData = req.body;
    const { productId } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      { new: true, runValidators: true }
    );
    if (!updateProduct) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Product Updated", data: updateProduct });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res,next) => {
  try {
    const { productId } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Product deleted", data: deleteProduct });
  } catch (err) {
     next(err);
  }
};
