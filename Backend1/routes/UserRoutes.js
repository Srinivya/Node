const express=require('express');

const {getUser,getUserById,createUser,updateUser, deleteUser,}=require('../controllers/UserController');
const {protect,authorize} = require('../middlewares/authMiddleware');
const UserRoutes=express.Router();

UserRoutes.get("/",getUser);

UserRoutes.get("/:userId",protect,authorize("user"),getUserById);
UserRoutes.post("/",createUser);
UserRoutes.put("/:userId",protect,authorize("admin"),updateUser);
UserRoutes.delete("/:userId",protect,authorize("admin"),deleteUser);


module.exports=UserRoutes;