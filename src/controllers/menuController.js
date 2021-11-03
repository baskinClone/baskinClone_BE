const BestIce = require("../models/bestIce");
const Icecream = require("../models/icecream");
const Cake = require("../models/cake");

exports.getIcecreamData = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 20;
  try {
    const bestIce = await BestIce.find({}, { _id: 0 });
    const allIcecream = await Icecream.find({}, { _id: 0 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    if (!allIcecream) {
      return res.status(406).json({ ok: false, message: "No data" });
    }
    return res
      .status(200)
      .json({ ok: true, bestIce: bestIce, allIcecream: allIcecream });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getCakeData = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 20;
  try {
    const data = await Cake.find(
      {},
      { _id: 0, name: 1, imgUrl: 1, hashtags: 1 }
    )
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
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
