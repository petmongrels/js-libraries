import {By} from "selenium-webdriver";

// thead/tr/th
class BrowserHtmlTable {
    async getTableData(tableElement, tableRelativeHeaderXPath) {
        const header = new Map();
        const headerCells = tableElement.findElements(By.tagName(tableRelativeHeaderXPath));
        headerCells.forEach((x, index) => {
            header.set(index, x.getText().trim());
        })
        const rows = await tableElement.findElements(By.tagName('tr'));
        for (const row of rows) {
            const columns = await row.findElements(By.tagName('td'));
            for (const column of columns) {
                const columnText = await column.getText();
                console.log('Data from table: ' + columnText);
            }
        }
    }
}

export default BrowserHtmlTable;
