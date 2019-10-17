const express = require("express");

const MontreController = require("../controllers/montres");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

// --- POST ---
router.post("", /*checkAuth,*/ extractFile, MontreController.createMontre);
router.post("/buy/", checkAuth, MontreController.buyMontre);

// --- GET ----
router.get("/:id", MontreController.getMontre);
router.get("", MontreController.getMontres);

// --- PUT ---

// --- DELETE ---
//router.delete("/:id", checkAuth, MontreController.deleteMontre);

module.exports = router;
