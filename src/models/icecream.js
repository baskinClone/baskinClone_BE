const mongoose = require("mongoose");

const icecreamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  hashTags: [{ type: String }],
});

const Icecream = mongoose.model("Icecream", icecreamSchema);

module.exports = Icecream;
