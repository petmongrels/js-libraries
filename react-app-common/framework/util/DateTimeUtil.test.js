import DateTimeUtil from "./DateTimeUtil";

it('should get display age from Java time period', function () {
    expect(DateTimeUtil.getAgeDisplay("P-20Y-1M-20D")).toEqual("20 year(s), 1 month(s)")
    expect(DateTimeUtil.getAgeDisplay("P-20Y")).toEqual("20 year(s)")
});

it('should parse period', function () {
    let {years, months} = DateTimeUtil.parsePeriod("P-74Y-3M-16D");
    expect(years).toEqual("74");
    expect(months).toEqual("3");
});

it('should get time as of now', function () {
    const actual = DateTimeUtil.time();
    expect(actual).toContain(":");
    expect(actual.length).toEqual(5);
});
