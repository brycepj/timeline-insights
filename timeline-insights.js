var Insights = (function (_) {

    function Insights(data, settings) {
        this.s = settings;
        this.d = _.sortBy(data, function (tweet) {
            return tweet.created_at;
        });
    }

    return Insights;

})(_);


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
Insights.prototype.textForTotals = function() {

	var data = this.d, text = [], arrayedText, wordLevel, sentenceLevel;

	if (this.textTotals) {
		return this.textTotals;
	}

	for (var i = 0; i < data.length; i++) {
		var tweet = data[i];

		if (!tweet.retweeted) {

			text.push(tweet.text);

		}
	}

	arrayedText = _.map(text, function(value) {
		var str = String(value);
		return str.split(" ");
	});

	function scrubForWords() {

		// remove all handles, links, RTs for word analysis & vocabulary

		var results = [];

		for (var i = 0; i < arrayedText.length; i++) {

			var noSymbols = _.filter(arrayedText[i], function(value) {
				var str = String(value).toLowerCase(), firstLetter = str.slice(
						0, 1), firstTwo = str.slice(0, 2), firstFour = str
						.slice(0, 4);

				return firstLetter !== "@" && firstFour !== "http"
						&& firstTwo !== "rt";
			});

			results.push(noSymbols);
		}

		// remove all punctuation

		for (var j = 0; j < results.length; j++) {
			var tweet = results[j];

			for (var k = 0; k < tweet.length; k++) {
				var word = tweet[k];

				var punctuationless = word.replace(
						/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
				var finalString = punctuationless.replace(/\s{2,}/g, " ");

				tweet[k] = finalString.toLowerCase();

			}

		}
		return results;
	}

	function scrubForSentences() {

		// remove all handles, links, RTs, and hashtags for sentence level

		var results = [];

		for (var i = 0; i < arrayedText.length; i++) {

			var noSymbols = _.filter(arrayedText[i], function(value) {
				var str = String(value).toLowerCase(), firstLetter = str.slice(
						0, 1), firstTwo = str.slice(0, 2), firstFour = str
						.slice(0, 4);

				return firstLetter !== "@" && firstLetter !== "#"
						&& firstFour !== "http" && firstTwo !== "rt";
			});

			results.push(noSymbols);
		}

		// remove punctuation except for periods

		for (var j = 0; j < results.length; j++) {
			var tweet = results[j];

			for (var k = 0; k < tweet.length; k++) {
				var word = tweet[k];

				var punctuationless = word.replace(
						/[\,"-@\/$%\^&\*;:{}=\-_`~()]/g, "");
				var finalString = punctuationless.replace(/\s{2,}/g, "");

				tweet[k] = finalString.toLowerCase();

			}

		}

		return results;

	}

	this.textTotals = {
		wordLevel : scrubForWords(),
		sentenceLevel : scrubForSentences()
	};

	return this.textTotals;
};
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
// return tweet data, sorted by day

Insights.prototype.tweetsByDay = function () {

    if (this.byDay) {
        return this.byDay;
    }
    
    var data = _.cloneDeep(this.tweetsWithDates());
   
    // group by dateStr

    data = _.groupBy(data, function (val) {
        return val.dateStr;
    });

    // store for later use
    this.byDay = data;

    return data;
};
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
// add moment data
Insights.prototype.tweetsWithDates = function() {

	var data = _.cloneDeep(this.d);
	
	if (this.withDates) {
		return this.withDates;
	}

	data = _.forEach(data, function(value, index, collection) {

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

};


Insights.prototype.sentiments = function(){
	
	if (this.sentimentTotals) {
        return this.sentimentTotals;
    }
    
	
    // store for later use
    this.sentimentTotals = data;

    return data;
	
};