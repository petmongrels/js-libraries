class SeleniumUtil {
    static async switchToTab(driver, tabTitle) {
        const title = await driver.getTitle();
        const tabs = await driver.getAllWindowHandles();
        await tabs.forEach(handle => {
            if (driver.getTitle() === tabTitle)
                return;
            driver.switchTo(handle);
        });
    }
}

export default SeleniumUtil;
