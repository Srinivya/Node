const express=require('express');
const { register } = require('../controllers/authController');
const { login } = require('../controllers/authController');
const { logout } = require('../controllers/authController');
const authRoutes=express.Router();


authRoutes.post("/register",register);
authRoutes.post("/login",login);
authRoutes.post("/logout",logout);


module.exports=authRoutes;