class SeleniumUtil {
    static async switchToTab(driver, tabTitle) {
        console.log("Getting tabs");
        const title = await driver.getTitle();
        console.log("Got title", title);
        const tabs = await driver.getAllWindowHandles();
        console.log("Got tabs", tabs);
        await tabs.forEach(handle => {
            if (driver.getTitle() === tabTitle)
                return;
            driver.switchTo(handle);
        });
    }
}

export default SeleniumUtil;
