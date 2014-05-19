var Insights = (function(_) {
	
	function Insights(data, settings) {
		this.s = settings;
		this.d = data;
	}

	// return tweet data, sorted by day
	Insights.prototype.dataByDay = function(){
		var data = _.cloneDeep(this.d);
		
		data = _.sortBy(data,function(tweet){
			return tweet.created_at;
		});
		
		data = _.groupBy(data,function(tweet){
			return tweet.created_at;
		});
		
		scrubDataByDay(data);
		
		
		return data;
	};

	function scrubDataByDay(data){
		
		console.log(data);
		
	}
	
	return Insights;

})(_);