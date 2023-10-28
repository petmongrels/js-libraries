import {SeleniumDriverFactory, SeleniumUtil} from "../index";

test("attach", async () => {
    const driver = SeleniumDriverFactory.createDriver({debugPort: 9227});
    await SeleniumUtil.switchToTab(driver, "Holdings / Console");
});
