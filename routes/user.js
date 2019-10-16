const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

<<<<<<< HEAD
//router.get("/", UserController.getAllUser);

=======
>>>>>>> master
module.exports = router;
