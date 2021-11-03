const express = require("express");

// Controllers
const { getIcecreamData } = require("../controllers/icecreamController");

const router = express.Router();

router.get("/getIcecream", getIcecreamData);

module.exports = router;
