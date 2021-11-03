const mongoose = require("mongoose");

const bestIceSchema = new mongoose.Schema({
  rank: { type: String },
  rankLabelUrl: { type: String },
  imgUrl: { type: String },
  name: { type: String },
});

bestIceSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("bestices");
    await this.insertMany(docs, { ordered: false });
  } catch (error) {
    console.log(error);
  }
};

const BestIce = mongoose.model("BestIce", bestIceSchema);

module.exports = BestIce;
