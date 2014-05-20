// tweets sorted by the year

Insights.prototype.tweetsByYear = function(){
	
	if (this.byYear) {
        return this.byYear;
    }
    
    var data = _.cloneDeep(this.tweetsWithDates());
   
    // group by year

    data = _.groupBy(data, function (val) {
        return val.moment._a[0];
    });

    // store for later use
    this.byYear = data;

    return data;
	
};