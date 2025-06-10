
const express=require("express");
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct } = require("../controllers/ProductController");

const ProductRoutes=express.Router();

ProductRoutes.get('/',getProducts);

ProductRoutes.post('/',createProduct);

ProductRoutes.get('/:productId',getProductById);
ProductRoutes.put('/:productId',updateProduct);

ProductRoutes.delete('/:productId',deleteProduct);

module.exports=ProductRoutes;