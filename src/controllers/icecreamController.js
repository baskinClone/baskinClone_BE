const Icecream = require("../models/icecream");

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
