const express = require("express");

// Controllers
const {
  getIcecreamData,
  getCakeData,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/getIcecream", getIcecreamData);
router.get("/getCake", getCakeData);

module.exports = router;
