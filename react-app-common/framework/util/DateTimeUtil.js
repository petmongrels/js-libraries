import moment from "moment";
import _ from "lodash";

const DateFormat = "YYYY-MM-DD";
const TimeFormat = "HH:MM";
const periodRegExp = new RegExp(/P-(?<year>[0-9]*)Y[-]?(?<month>[0-9]*)[M]?[-]?(?<day>[0-9]*)[D]?/);

class DateTimeUtil {
    static get Years() {
        return "years";
    }

    static get Months() {
        return "months";
    }

    static today() {
        return moment().format(DateFormat);
    }

    static time(time = moment()) {
        return time.format(TimeFormat);
    }

    static getAgeDisplay(age) {
        //named capture group is not supported universally yet
        const {years, months} = this.parsePeriod(age);
        let str = `${years} year(s)`;
        if (months !== "")
            str += `, ${months} month(s)`
        return str;
    }

    static parsePeriod(period) {
        const matchArray = periodRegExp.exec(period);
        const years = matchArray[1];
        const months = matchArray[2];
        return {years, months};
    }
    
    static periodAsAge(period) {
        const {years, months} = this.parsePeriod(period);
        let age, ageDurationType;
        if (!_.isEmpty(years) && parseInt(years) > 0) {
            age = years;
            ageDurationType = DateTimeUtil.Years;
        }
        else if (!_.isEmpty(months) && parseInt(months) > 0) {
            age = months;
            ageDurationType = DateTimeUtil.Months;
        } else {
            age = "";
            ageDurationType = DateTimeUtil.Months;
        }
        return {age, ageDurationType};
    }
}

export default DateTimeUtil;
