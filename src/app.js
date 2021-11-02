const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./db");

const Icecream = require("./models/icecream");

const app = express();
const logger = morgan("dev");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/", async (req, res, next) => {
  const result = await Icecream.saveDocs({
    rank: "1위",
    imgurl: "aaa",
    name: "aaa",
  });
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
