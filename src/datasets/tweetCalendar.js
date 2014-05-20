// tweets sorted by the hour of the day

Insights.prototype.tweetCalendar = function() {

	if (this.byCalendar) {
		return this.byCalendar;
	}

	var data = _.cloneDeep(this.tweetsByYear());

	for ( var prop in data) {
		var year = data[prop];

		var sorted = _.groupBy(year, function(val) {
			return val.moment._a[1];
		});

		data[prop] = sorted;
	}

	(function() {
		
		for ( var prop in data) {
			var year = data[prop];

			for ( var prop2 in year) {
				var month = year[prop2];

				var sorted = _.groupBy(month, function(val) {
					return val.moment._a[2];
				});

				year[prop2] = sorted;
			}
		}

	})();

	// store for later use
	this.byCalendar = data;

	return data;

};