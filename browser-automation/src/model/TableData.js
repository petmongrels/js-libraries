class TableData {
    header;
    rows;

    constructor() {
        this.header = new Map();
        this.rows = [];
    }

    addHeaderItem(index, headerText) {
        this.header.set(index, headerText);
    }

    addCell(rowIndex, columnIndex, cellText) {
        if (rowIndex >= this.rows.length) {
            this.rows.push(new Map());
        }
        this.rows[rowIndex].set(columnIndex, cellText);
    }
}

export default TableData;
