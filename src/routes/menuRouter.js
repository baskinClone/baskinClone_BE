const express = require("express");

// Controllers
const {
  getIcecreamData,
  getCakeData,
  getBeverageData,
  getCoffee,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/getIcecream", getIcecreamData);
router.get("/getCake", getCakeData);
router.get("/getbeverage", getBeverageData);
router.get("/getCoffee", getCoffee);

module.exports = router;
