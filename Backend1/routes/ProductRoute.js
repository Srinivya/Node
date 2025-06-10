
const express=require("express");
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct, getAllProducts } = require("../controllers/ProductController");

const ProductRoutes=express.Router();

ProductRoutes.get('/',getAllProducts);

ProductRoutes.post('/',createProduct);

ProductRoutes.get('/:productId',getProductById);
ProductRoutes.put('/:productId',updateProduct);


ProductRoutes.delete('/:productId',deleteProduct);

module.exports=ProductRoutes;