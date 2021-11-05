const mongoose = require("mongoose");

const dessertSchema = new mongoose.Schema({
  title: String,
  hashtags: String,
  imgUrl: String,
});

dessertSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("desserts");
    await this.insertMany(docs, { ordered: false });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("dessert", dessertSchema);
