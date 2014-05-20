Insights.prototype.textByDay = function() {

	var data = this.tweetsByDay(),
	text;

	(function() {
		for ( var key in data) {
			var day = data[key];

			data[key] = _.pluck(day,'text');
		}
	})();
	
	return data;
};