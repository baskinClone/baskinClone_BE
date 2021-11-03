const puppeteer = require("puppeteer");
// require("../db");
// require("dotenv").config();

const Cake = require("../models/cake");

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://www.baskinrobbins.co.kr/menu/list.php?top=B", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("#prd_list > aside > ul");
    const cake = [];
    for (let i = 1; i <= 20; i++) {
      const icecreams = {};
      icecreams.name = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > figcaption > span`,
        (el) => {
          return el.textContent;
        }
      );
      icecreams.imgUrl = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > span > img`,
        (el) => {
          return el.src;
        }
      );
      icecreams.hashtags = await page.$$eval(
        `li:nth-child(${i}) > div.hashbox > div > div > ul > li`,
        (elArr) => {
          const array = [];
          for (let el of elArr) {
            array.push(el.textContent.trim());
          }
          return array;
        }
      );
      cake.push(icecreams);
    }
    await page.click("#content > nav > ul > li:nth-child(3) > a");
    await page.waitFor(3000);
    await page.waitForSelector("#prd_list > aside > ul");
    // 2페이지
    const icecreams = {};
    icecreams.name = await page.$eval(
      `#prd_list > aside > ul > li > a > figure > figcaption > span`,
      (el) => {
        return el.textContent;
      }
    );
    cake.push(icecreams);
    await page.close();
    await browser.close();
    return cake;
  } catch (error) {
    console.log(error);
  }
};

const save = async () => {
  const cake = await crawler();
  await Cake.saveDocs(cake);
};

save();
