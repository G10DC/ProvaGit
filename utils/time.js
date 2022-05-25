const mm = require('moment');
const config = require('../config').ITA;
const h24 = 24 * 60 * 60 * 1000;

function _nice(n) {
    return (n < 10 ? '0' + n : n).toString();
}

function _format(_date, _sign) {
    return mm(new Date(_date)).format(`YYYY${_sign}MM${_sign}DD`);
}

function _dayObject(_date) {
    return {
        date: _format(_date, '-'),
        dateF: _format(_date, '-'),
        day: _date.getDate(),
        dayF: _nice(_date.getDate()),
        dayL: config.DAYS[_date.getDay()],
        month: _date.getMonth() + 1,
        monthF: _nice(_date.getMonth() + 1),
        monthL: config.MONTHS[_date.getMonth()],
    }
}

function today() {
    return _dayObject(new Date());
}

function dayAfter(_date) {
    const _date_ = new Date(_date);
    return _dayObject(new Date(_date_.getTime() + h24));
}

function dayBefore(_date) {
    const _date_ = new Date(_date);
    return _dayObject(new Date(_date_.getTime() - h24));
}

function dayInterval(_date, _days) {
    const _date_ = new Date(_date);
    const dayList = [_dayObject(_date_)];
    for (let i = 0; i < _days - 1; i++) {
        dayList.push(dayAfter(dayList.slice(-1)[0].date));
    }
    return dayList;
}

function week(_date) {
    const _date_ = new Date(_date);
    return dayInterval(new Date(_date_.getTime() - (_date_.getDay() - config.FIRST) * h24), 7);
}

function work_week(_date) {
    const _date_ = new Date(_date);
    return dayInterval(new Date(_date_.getTime() - (_date_.getDay() - 1) * h24), 5);
}


module.exports = { today, dayAfter, dayBefore, dayInterval, week, work_week }