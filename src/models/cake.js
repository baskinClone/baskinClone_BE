const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  cakes: [{ name: String, imgUrl: String, hashtags: [String] }],
});

cakeSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("cakes");
    await this.insertMany(docs);
  } catch (error) {
    console.log(error);
  }
};

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;
