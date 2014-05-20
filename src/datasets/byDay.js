// return tweet data, sorted by day
Insights.prototype.dataByDay = function () {

    if (this.byDay) {
        return this.byDay;
    }
    var data = _.cloneDeep(this.d);

    data = _.sortBy(data, function (tweet) {
        return tweet.created_at;
    });

    data = _.forEach(data, function (value, index, collection) {

        var date = moment(value.created_at, "YYYY-MM-DD hh:mm:ss"),
            dateStr;

        value.moment = date;

        // add zero to single digits month and day values

        if (String(value.moment._a[1]).length === 1) {
            value.moment._a[1] = "0" + String(value.moment._a[1]);
        }

        if (String(value.moment._a[2]).length === 1) {
            value.moment._a[1] = "0" + String(value.moment._a[2]);
        }
        // create unique string from date

        dateStr = String(value.moment._a[0]) + String(value.moment._a[1]) + String(value.moment._a[2]);

        value.dateStr = dateStr;

    });

    // group by dateStr

    data = _.groupBy(data, function (val) {
        return val.dateStr;
    });

    // store for later use
    this.byDay = data;

    return data;
};