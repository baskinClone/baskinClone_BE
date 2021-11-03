const Icecream = require("../models/icecream");
const Cake = require("../models/cake");

exports.getIcecreamData = async (req, res, next) => {
  try {
    const data = await Icecream.find({}, { _id: 0 });
    if (!data) {
      return res.status(406).json({ ok: false, message: "No data" });
    }
    return res.status(200).json({ ok: true, data: data });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getCakeData = async (req, res, next) => {
  try {
    const data = await Cake.find({}, { cakes: 1 });
    if (!data) {
      return res.status(406).json({ ok: false, message: "No data" });
    }
    return res.status(200).json({ ok: true, data: data[0].cakes });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
