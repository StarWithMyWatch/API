const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("", UserController.createUser); // TODO remove doublon
router.post("/login", UserController.userLogin);

router.get("", UserController.getUsers);
router.get("/femmes", UserController.getFemmes);
router.get("/hommes", UserController.getHommes);

module.exports = router;
