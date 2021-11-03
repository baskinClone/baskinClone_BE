const mongoose = require("mongoose");

const icecreamSchema = new mongoose.Schema({
  name: { type: String },
  imgUrl: { type: String },
  coneUrl: { type: String },
  hashtags: [{ type: String }],
});

icecreamSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("icecreams");
    await this.insertMany(docs, { ordered: false });
  } catch (error) {
    console.log(error);
  }
};

const Icecream = mongoose.model("Icecream", icecreamSchema);

module.exports = Icecream;
