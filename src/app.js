const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();
const logger = morgan("dev");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});