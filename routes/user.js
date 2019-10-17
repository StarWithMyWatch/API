const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.post("", UserController.createUser);
router.get("", UserController.getUsers);
router.get("/femmes", UserController.getFemmes);
router.get("/hommes", UserController.getHommes);

router.get("/:id", UserController.getUserById);

router.put("/paidWithMany", UserController.updatePointWhenBuy);
router.put("/getPointsByCode", UserController.updatePointByCode);






























module.exports = router;
