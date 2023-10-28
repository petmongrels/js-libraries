import SeleniumDriverFactory from "./SeleniumDriverFactory";

test('should use chrome from path', async function () {
    const driver = SeleniumDriverFactory.createDriver();
    await driver.get('https://www.google.com').then(() => SeleniumDriverFactory.exitBrowser());
});

test('should use chrome from the provided path', async function () {
    const driver = SeleniumDriverFactory.createDriver({binaryPath: "~/.cache/selenium/chromedriver"});
    await driver.get('https://www.google.com').then(() => SeleniumDriverFactory.exitBrowser());
});
