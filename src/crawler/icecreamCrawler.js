const puppeteer = require("puppeteer");
require("dotenv").config();
require("../db");

const Icecream = require("../models/icecream");

const crawler = async () => {
  const monthlyBest = [];
  const icecreams = [];
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://www.baskinrobbins.co.kr/menu/list.php?top=A", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("#slider > div > ul");
    // Monthly best icecream 크롤링
    for (let i = 1; i <= 10; i++) {
      const bestIcecreams = {};
      bestIcecreams.rate = await page.$eval(
        `#slider > div > ul > li:nth-child(${i}) > a > div > strong`,
        (el) => {
          return el.textContent;
        }
      );
      bestIcecreams.imgUrl = await page.$eval(
        `#slider > div > ul > li:nth-child(${i}) > a > div > span > img`,
        (el) => {
          return el.src;
        }
      );
      bestIcecreams.name = await page.$eval(
        `#slider > div > ul > li:nth-child(${i}) > a > span`,
        (el) => {
          return el.textContent;
        }
      );
      monthlyBest.push(bestIcecreams);
    }
    // Icecream 크롤링 (1페이지)
    await page.waitForSelector("#prd_list > aside > ul");
    for (let i = 1; i <= 20; i++) {
      const icecream = {};
      icecream.name = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > figcaption > span`,
        (el) => {
          return el.textContent;
        }
      );
      icecream.imgUrl = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > span > img`,
        (el) => {
          return el.src;
        }
      );
      icecream.hashtags = await page.$$eval(
        `li:nth-child(${i}) > div.hashbox > div > div > ul > li`,
        (elArr) => {
          const array = [];
          for (let el of elArr) {
            array.push(el.textContent.trim());
          }
          return array;
        }
      );
      icecreams.push(icecream);
    }
    // 2페이지
    await page.waitForSelector("#content > nav > ul > li:nth-child(3) > a");
    await page.click("#content > nav > ul > li:nth-child(3) > a");
    await page.waitFor(3000);
    await page.waitForSelector("#prd_list > aside > ul");
    for (let i = 1; i <= 20; i++) {
      const icecream = {};
      icecream.name = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > figcaption > span`,
        (el) => {
          return el.textContent;
        }
      );
      icecream.imgUrl = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > span > img`,
        (el) => {
          return el.src;
        }
      );
      icecream.hashtags = await page.$$eval(
        `li:nth-child(${i}) > div.hashbox > div > div > ul > li`,
        (elArr) => {
          const array = [];
          for (let el of elArr) {
            array.push(el.textContent.trim());
          }
          return array;
        }
      );
      icecreams.push(icecream);
    }
    // 3페이지
    await page.waitForSelector("#content > nav > ul > li:nth-child(4) > a");
    await page.click("#content > nav > ul > li:nth-child(4) > a");
    await page.waitFor(3000);
    await page.waitForSelector("#prd_list > aside > ul");
    for (let i = 1; i <= 11; i++) {
      const icecream = {};
      icecream.name = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > figcaption > span`,
        (el) => {
          return el.textContent;
        }
      );
      icecream.imgUrl = await page.$eval(
        `#prd_list > aside > ul > li:nth-child(${i}) > a > figure > span > img`,
        (el) => {
          return el.src;
        }
      );
      icecream.hashtags = await page.$$eval(
        `li:nth-child(${i}) > div.hashbox > div > div > ul > li`,
        (elArr) => {
          const array = [];
          for (let el of elArr) {
            array.push(el.textContent.trim());
          }
          return array;
        }
      );
      icecreams.push(icecream);
    }
    await page.close();
    await browser.close();
  } catch (error) {
    console.log(error);
  }
  return { monthlyBest, icecreams };
};

const save = async () => {
  const docs = await crawler();
  await Icecream.saveDocs(docs);
};

save();
