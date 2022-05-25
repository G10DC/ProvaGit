const fl = require('./utils/file.js')
const tm = require('./utils/time.js')

const listDays = tm.dayInterval(tm.today().date, 3);
const work_week = tm.work_week(tm.today().date);

fl.writeJson('./data/listDays.json', listDays);
fl.writeJson('./data/work_week.json', work_week);

// EXAMPLE
fl.jsonToXlsx(work_week, 'foglio1', './data/work_week.xlsx')
const data = fl.xlsxToJson('./data/work_week.xlsx');
console.log(data[0].data)