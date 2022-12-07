const puppeteer = require("puppeteer");
const {
  clickElement,
  getText,
  clickElementFromMassive,
} = require("./lib/command.js");
let page;
let row = 3;
let place = 5;
let placeVip = 1;

describe("GoToTheCinema", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(() => {
    page.close();
  });

  test("BookTicket", async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");

    await clickElementFromMassive(page, '[class="page-nav__day-week"]', 3);

    await clickElement(page, '[class="movie-seances__time-block"]');

    await page.waitForSelector("div:nth-child(6) > span");
    await (await page.$$(`div:nth-child(${row + 1}) > span`))[place].click();

    await clickElement(page, '[class="acceptin-button"]');

    await page.waitForSelector('[class="ticket__check-title"]');
    await clickElement(page, '[class="acceptin-button"]');

    const title = await getText(page, '[class="ticket__check-title"]');
    expect(title).toEqual("Электронный билет");
  });

  test("BookVipTicket", async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");

    await clickElementFromMassive(page, '[class="page-nav__day-week"]', 1);

    await clickElementFromMassive(
      page,
      '[class="movie-seances__time-block"]',
      2
    );

    await clickElementFromMassive(
      page,
      ".buying-scheme__chair.buying-scheme__chair_vip",
      placeVip
    );

    await clickElement(page, '[class="acceptin-button"]');

    await page.waitForSelector('[class="ticket__check-title"]');
    await clickElement(page, '[class="acceptin-button"]');

    const title = await getText(page, '[class="ticket__check-title"]');
    expect(title).toEqual("Электронный билет");
  });

  test("NotBookTicket", async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");

    await clickElementFromMassive(page, '[class="page-nav__day-week"]', 1);

    await clickElementFromMassive(
      page,
      '[class="movie-seances__time-block"]',
      2
    );

    await page.waitForSelector("div:nth-child(6) > span");
    await (await page.$$(`div:nth-child(${row}) > span`))[place].click();

    await clickElement(page, '[class="acceptin-button"]');

    await page.waitForSelector('[class="ticket__check-title"]');
    await clickElement(page, '[class="acceptin-button"]');

    await page.goto("https://qamid.tmweb.ru/client/index.php");

    await clickElementFromMassive(page, '[class="page-nav__day-week"]', 1);

    await clickElementFromMassive(
      page,
      '[class="movie-seances__time-block"]',
      2
    );

    await page.waitForSelector("div:nth-child(6) > span");

    await expect(() => page.toClick('[class="acceptin-button"]')).toThrow();
    // await expect(clickElement(page, '[class="acceptin-button"]')).toThrow();
  });
});