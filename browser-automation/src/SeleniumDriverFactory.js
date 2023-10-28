import _ from "lodash";
import chrome from "selenium-webdriver/chrome";
import {Builder} from "selenium-webdriver";

let driver;

class SeleniumDriverFactory {
    static createDriver({binaryPath = null, debugPort = null} = {}) {
        if (!_.isNil(driver)) return driver;

        const chromeOptions = new chrome.Options();
        if (!_.isNil(binaryPath)) chromeOptions.setBinaryPath(binaryPath);
        if (!_.isNil(debugPort)) chromeOptions.debuggerAddress(`127.0.0.1:${debugPort}`);

        console.log("using chrome options", JSON.stringify(chromeOptions));

        driver = new Builder().forBrowser('chrome')
            .setChromeOptions(chromeOptions).build();

        return driver;
    }

    static async exitBrowser() {
        if (_.isNil(driver)) return;

        await driver.close();
        await driver.quit();
        driver = null;
    }
}

export default SeleniumDriverFactory;
