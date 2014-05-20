// tweets sorted by the hour of the day

Insights.prototype.tweetsByMonth = function(){
	
	if (this.byMonth) {
        return this.byMonth;
    }
    
    var data = _.cloneDeep(this.tweetsWithDates());
   
    // group by hour

    data = _.groupBy(data, function (val) {
        return val.moment._a[1];
    });

    // store for later use
    this.byMonth = data;

    return data;
	
};