Insights.prototype.textByDay = function() {

	if (this.textDay) {
		return this.textDay;
	}
	
	var data = this.tweetsByDay(),
	text;

	(function() {
		for ( var key in data) {
			var day = data[key];

			data[key] = _.pluck(day,'text');
		}
	})();
	
	this.textDay = data;
	
	return data;
};