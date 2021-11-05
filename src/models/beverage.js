const mongoose = require("mongoose");

const beverageSchema = new mongoose.Schema({
  title: String,
  hashtags: String,
  imgUrl: String,
});

beverageSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("beverages");
    await this.insertMany(docs, { ordered: false });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("beverage", beverageSchema);
