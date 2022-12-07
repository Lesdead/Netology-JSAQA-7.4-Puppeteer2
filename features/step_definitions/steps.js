const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const {selectDateTime, orderTickets} = require("../../lib/util.js");

Before({timeout: 30000}, async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 60000,
  });
});

When("When user chooses day {int}", async function (int) {
  await selectDateTime(this.page, `nav.page-nav > a:nth-child(${int1})`, movieTime);
});

When("When user chooses row {int} seat {int}"), async function (int1, int2) {
  await orderTickets(this.page, int1, int2);
});

When("When user chooses row {int} seat {int},{int}", async function (int1, int2, int3) {
  await orderTickets(this.page, int1, int2, int3);
});

When("user click {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user received confirmation and qr-code", async function () {
  const actual = await getText(this.page, ticketHint);
  expect(actual).contain(confirmingText);
});