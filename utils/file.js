const fs = require('fs');
const XLSX = require("xlsx");

function readJson(_filepath) {
    return JSON.parse(fs.readFileSync(_filepath));
}

function writeJson(_filepath, _data) {
    return fs.writeFileSync(_filepath, JSON.stringify(_data));
}

function jsonToXlsx(_data, _sheetName, _outputfile) {
    const ws = XLSX.utils.json_to_sheet(_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, _sheetName);
    XLSX.writeFile(wb, _outputfile);
}

function xlsxToJson(_filepath) {
    const workbook = XLSX.readFile(_filepath);
    const sheet_name_list = workbook.SheetNames;
    const superdata = [];
    sheet_name_list.forEach(function (y) {
        const worksheet = workbook.Sheets[y];
        const headers = {};
        const data = [];
        for (z in worksheet) {
            if (z[0] === '!') continue;
            //parse out the column, row, and value
            let tt = 0;
            for (let i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            };
            const col = z.substring(0, tt);
            const row = parseInt(z.substring(tt));
            const value = worksheet[z].v;

            //store header names
            if (row == 1 && value) {
                headers[col] = value;
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        superdata.push({ sheet_name: y, data });
    });
    return superdata;
}

module.exports = { readJson, writeJson, jsonToXlsx, xlsxToJson }