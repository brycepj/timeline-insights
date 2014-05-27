// return tweet data, sorted by day

Insights.prototype.tweetsByDay = function () {

    if (this.byDay) {
        return this.byDay;
    }
    
    var data = _.cloneDeep(this.tweetsWithDates("simple"));
   
    // group by dateStr

    data = _.groupBy(data, function (val) {
        return val.dateStr;
    });

    // store for later use
    this.byDay = data;

    return data;
};