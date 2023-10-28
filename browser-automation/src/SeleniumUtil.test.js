import {SeleniumDriverFactory, SeleniumUtil} from "../index";

//this will work when chrome is launched with a new profile
xtest("attach", async () => {
    const driver = SeleniumDriverFactory.createDriver({debugPort: 9227});
    await SeleniumUtil.switchToTab(driver, "Holdings / Console");
});
