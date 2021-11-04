const puppeteer = require("puppeteer");
require("dotenv").config();
require("../db");

const Coffee = require("../models/coffee");

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://www.baskinrobbins.co.kr/menu/list.php?top=D", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("#prd_list > aside > ul");
    const coffee = [];
    for (let i = 1; i <= 18; i++) {
      const item = {};
      item.name = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > figcaption > span`,
        (el) => {
          return el.textContent;
        }
      );
      item.hashtags = await page.$$eval(
        `li:nth-child(${i}) > div.hashbox > div > div > ul > li`,
        (elArr) => {
          const array = [];
          for (let el of elArr) {
            array.push(el.textContent.trim());
          }
          return array;
        }
      );
      item.imgUrl = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > span > img`,
        (el) => {
          return el.src;
        }
      );
      coffee.push(item);
    }
    await page.close();
    await browser.close();
    return coffee;
  } catch (error) {
    console.log(error);
  }
};

const save = async () => {
  const docs = await crawler();
  await Coffee.saveDocs(docs);
};

save();
