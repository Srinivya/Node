const express=require('express');

const {getUser,getUserById,createUser,updateUser, deleteUser,}=require('../controllers/UserController');
const UserRoutes=express.Router();

UserRoutes.get("/",getUser);

UserRoutes.get("/:userId",getUserById);
UserRoutes.post("/",createUser);
UserRoutes.put("/:userId",updateUser);
UserRoutes.delete("/:userId",deleteUser);


module.exports=UserRoutes;