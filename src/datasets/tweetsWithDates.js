// add moment data
Insights.prototype.tweetsWithDates = function (simple) {

    var data = _.cloneDeep(this.d);

    if (simple === "simple") {

        if (this.withSimpleDates) {
            return this.withSimpleDates;
        }

        data = _.forEach(data, function (tweet, index, collection) {
            var dateStr = tweet.created_at,
                date = dateStr.substring(0, 10);


            date = date.replace(/-/g, "");

            tweet.dateStr = date;

        });

        this.withSimpleDates = data;

        return data;
    } else {

        if (this.withDates) {
            return this.withDates;
        }

        data = _.forEach(data, function (value, index, collection) {

            var date = moment(value.created_at, "YYYY-MM-DD hh:mm:ss"), dateStr;

            value.moment = date;

            // add zero to single digits month and day values

            if (String(value.moment._a[1]).length === 1) {
                value.moment._a[1] = "0" + String(value.moment._a[1]);
            }

            if (String(value.moment._a[2]).length === 1) {
                value.moment._a[2] = "0" + String(value.moment._a[2]);
            }
            // create unique string from date

            dateStr = String(value.moment._a[0]) + String(value.moment._a[1]) + String(value.moment._a[2]);

            value.dateStr = dateStr;

        });

        this.withDates = data;

        return data;
    }

};