import {By} from "selenium-webdriver";
import TableData from "./model/TableData";

class BrowserHtmlTable {
    static async getTableData(tableElement, {tableHeaderXPath, tableRowXPath = "./tbody/tr"}) {
        const tableData = new TableData();
        const headerCells = await tableElement.findElements(By.xpath(tableHeaderXPath));
        headerCells.forEach(async (x, index) => {
            const headerCellText = await x.getText();
            tableData.addHeaderItem(index, headerCellText);
        });
        const rows = await tableElement.findElements(By.xpath(tableRowXPath));
        for (let i = 0; i < rows.length; i++) {
            const cells = await rows[i].findElements(By.xpath('./td'));
            for (let j = 0; j < cells.length; j++) {
                const cellText = await cells[j].getText();
                tableData.addCell(i, j, cellText);
            }
        }
        return tableData;
    }
}

export default BrowserHtmlTable;
