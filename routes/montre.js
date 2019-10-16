const express = require("express");

const MontreController = require("../controllers/montres");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", /*checkAuth,*/ extractFile, MontreController.createMontre);

//router.put("/:id", checkAuth, extractFile, MontreController.updateMontre);

router.get("", MontreController.getMontres);

router.get("/:id", MontreController.getMontre);

//router.delete("/:id", checkAuth, MontreController.deleteMontre);

module.exports = router;
