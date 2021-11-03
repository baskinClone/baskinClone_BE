const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: { type: String },
  imgUrl: { type: String },
  hashtags: [{ type: String }],
});

cakeSchema.statics.saveDocs = async function (docs) {
  try {
    console.log(docs);
    await mongoose.connection.dropCollection("cakes");
    await this.insertMany(docs, { ordered: false });
  } catch (error) {
    console.log(error);
  }
};

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;
