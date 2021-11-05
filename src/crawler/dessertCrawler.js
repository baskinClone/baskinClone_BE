const axios = require("axios");
const cheerio = require("cheerio");
const Dessert = require("../models/dessert");
require("dotenv").config();
require("../db");

const crawler = async () => {
  try {
    const list = [];
    for (let i = 1; i <= 2; i++) {
      const html = await axios.get(
        `http://www.baskinrobbins.co.kr/menu/list.php?Page=${i}&top=E&sub=`
      );
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
    }
    Dessert.saveDocs(list);
  } catch (err) {
    console.log(error);
  }
};

crawler();
