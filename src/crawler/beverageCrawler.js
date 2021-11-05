const axios = require("axios");
const cheerio = require("cheerio");
const Beverage = require("../models/beverage");
require("dotenv").config();
require("../db");

const getHTML = async () => {
  try {
    return await axios.get(
      "http://www.baskinrobbins.co.kr/menu/list.php?top=C"
    );
  } catch (err) {
    console.log(error);
  }
};

getHTML()
  .then((html) => {
    let list = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.inner_content ul").children("li.item");

    $bodyList.each(function (i, elem) {
      list.push({
        title: $(this).find("span:eq(0)").text(),
        hashtags: $(this).find("div.hashtag > ul > li > a").text(),
        imgUrl:
          "http://www.baskinrobbins.co.kr" +
          $(this).find(".img > img").attr("src"),
      });
    });
    return list;
  })
  .then((result) => {
    Beverage.saveDocs(result);
  });
