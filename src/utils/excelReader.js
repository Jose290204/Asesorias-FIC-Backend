const ExcelJS = require('exceljs');

async function leerExcel(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const hoja = workbook.worksheets[0];

    const filas = [];
    for (let numeroFila = 2; numeroFila <= hoja.rowCount; numeroFila++) {
        const fila = hoja.getRow(numeroFila);
        if (!fila.getCell(1).value) continue;
        filas.push({ numeroFila, fila });
    }
    return filas;
}

module.exports = { leerExcel };