const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./db");

// Routes
const menuRouter = require("./routes/menuRouter");

const app = express();
const logger = morgan("dev");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/api", menuRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const errorStatus = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(errorStatus).json({ message, data });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
