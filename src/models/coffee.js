const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  name: { type: String },
  hashtags: [{ type: String }],
  imgUrl: { type: String },
});

coffeeSchema.statics.saveDocs = async function (docs) {
  try {
    await mongoose.connection.dropCollection("coffees");
    await this.insertMany(docs, { ordered: false });
  } catch (error) {
    console.log(error);
  }
};

const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;
