// return tweet data, sorted by day

Insights.prototype.dataByDay = function () {

    if (this.byDay) {
        return this.byDay;
    }
    
    var data = _.cloneDeep(this.dataWithDates());
   
    // group by dateStr

    data = _.groupBy(data, function (val) {
        return val.dateStr;
    });

    // store for later use
    this.byDay = data;

    return data;
};