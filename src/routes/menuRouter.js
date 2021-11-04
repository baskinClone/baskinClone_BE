const express = require("express");

// Controllers
const {
  getIcecreamData,
  getCakeData,
  getBeverageData,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/getIcecream", getIcecreamData);
router.get("/getCake", getCakeData);
router.get("/getbeverage", getBeverageData);

module.exports = router;
