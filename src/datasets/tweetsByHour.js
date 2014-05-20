// tweets sorted by the hour of the day

Insights.prototype.tweetsByHour = function(){
	
	if (this.byHour) {
        return this.byHour;
    }
    
    var data = _.cloneDeep(this.tweetsWithDates());
   
    // group by hour

    data = _.groupBy(data, function (val) {
        return val.moment._a[3];
    });

    // store for later use
    this.byHour = data;

    return data;
	
};