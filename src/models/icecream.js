const mongoose = require("mongoose");

const icecreamSchema = new mongoose.Schema({
  monthlyBest: [
    {
      rank: String,
      rankLabelUrl: String,
      imgUrl: String,
      name: String,
    },
  ],
  icecreams: [{ name: String, imgUrl: String, hashtags: [String] }],
});

icecreamSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("icecreams");
    await this.insertMany(docs);
  } catch (error) {
    console.log(error);
  }
};

const Icecream = mongoose.model("Icecream", icecreamSchema);

module.exports = Icecream;
