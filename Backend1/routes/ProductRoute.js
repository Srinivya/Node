
const express=require("express");
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct, getAllProducts } = require("../controllers/ProductController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const ProductRoutes=express.Router();

ProductRoutes.get('/',protect,authorize("admin"),getAllProducts);

ProductRoutes.post('/',createProduct);

ProductRoutes.get('/:productId',getProductById);
ProductRoutes.put('/:productId',protect,updateProduct);


ProductRoutes.delete('/:productId',protect,deleteProduct);

module.exports=ProductRoutes;