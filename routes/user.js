const express = require("express");
const UserController = require("../controllers/user");
const extractFile = require("../middleware/file");

const router = express.Router();

// --- POST ---
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/createconcours", UserController.createConcours)

// --- GET ----
router.get("", UserController.getUsers);
router.get("/femmes", UserController.getFemmes);
router.get("/hommes", UserController.getHommes);
router.get("/:id", UserController.getUserById);

// --- PUT ---
router.put("/imageSet", extractFile, UserController.setImageToUser);

//paiment avec l'argent {avec code et sans code}
router.put("/paidWithMany", UserController.updatePointWhenBuy);
router.put("/paidWithPoints", UserController.updatePointWhenPoints);
router.put("/star", UserController.updateUserPointAfeterSelectStar);

module.exports = router;
