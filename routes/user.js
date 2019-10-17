const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

// --- POST ---
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.put("/imageSet", UserController.setImageToUser);
router.post("/concours", UserController.finishConcours)
// --- GET ----
router.get("", UserController.getUsers);
router.get("/femmes", UserController.getFemmes);
router.get("/hommes", UserController.getHommes);

module.exports = router;
