const puppeteer = require("puppeteer");

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://www.baskinrobbins.co.kr/menu/list.php?top=A");
    await page.close();
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

crawler();
