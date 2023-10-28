import {By} from "selenium-webdriver";

class BrowserHtmlTable {
    static async getTableData(tableElement, {tableHeaderXPath, tableRowXPath = "tbody/tr"}) {
        const header = new Map();
        const headerCells = tableElement.findElements(By.tagName(tableHeaderXPath));
        console.log('HEADER');
        headerCells.forEach((x, index) => {
            const headerCellText = x.getText().trim();
            console.log(headerCellText);
            header.set(index, headerCellText);
        })
        const rows = await tableElement.findElements(By.tagName(tableRowXPath));
        for (const row of rows) {
            const cells = await row.findElements(By.tagName('td'));
            console.log('ROW');
            for (const cell of cells) {
                const cellText = await cell.getText();
                console.log(cellText);
            }
        }
    }
}

export default BrowserHtmlTable;
