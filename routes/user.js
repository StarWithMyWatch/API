const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

// --- POST ---
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);

// --- GET ----
router.get("", UserController.getUsers);
router.get("/femmes", UserController.getFemmes);
router.get("/hommes", UserController.getHommes);

module.exports = router;
