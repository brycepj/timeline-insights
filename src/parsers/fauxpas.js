Insights.prototype.fauxpas = function() {

	var data = this.tweetsWithDates();
	var text = this.textForTotals();

	function rant() {

		var scrubbed = [], counted, sorted;
		var prevD = null, prevH = null, prevM = null, prevS = null, prevCount = 0;

		for (var i = 0; i < data.length; i++) {

			var tweet = data[i];

			if (!tweet.in_reply_to_screen_name) {
				var currentDay = tweet.dateStr;
				var currentHour = tweet.moment._a[3];
				var currentMin = tweet.moment._a[4];
				var currentSec = tweet.moment._a[5];

				if (i === 0) {
					prevD = currentDay;
					prevH = currentHour;
					prevM = currentMin;
					prevS = currentSec;

				} else {

					if (currentDay === prevD
							&& currentHour === prevH
							&& (currentMin === prevM || currentMin === prevM + 1)) {
						prevCount += 1;

						scrubbed.push({
							day : prevD,
							hour : prevH,
							min : prevM,
							sec : prevS,
							count : prevCount
						});

					} else {

						prevD = currentDay;
						prevH = currentHour;
						prevM = currentMin;
						prevS = currentSec;

						prevCount = 0;
					}
				}
			}

		}

		counted = _.filter(scrubbed, function(dup) {
			return dup.count > 1;
		});

		uniq = _.forEach(counted, function(tweet) {
			var str = tweet.day + tweet.hour + tweet.min;
			tweet.str = str;
		});

		sorted = _.countBy(uniq, function(tweet) {
			return tweet.str;
		});

		return {
			count : sorted.length,
			times : sorted
		};
	}

	function plsRT() {

		var words = text.wordLevel;
		var fullText = text.fullText;
		var please = false;
		var pleaseRTs = 0;
		var offenses = [];
		
		for (var i = 0; i < words.length; i++) {
			var tweet = words[i];

			for (var j = 0; j < tweet.length; j++) {
				var word = tweet[j];
				word = word.toLowerCase();

				if (please) {
					if (word === "rt" || word === "retweet") {
						pleaseRTs++;
						offenses.push(fullText[i]);
					}

					please = false;
				}

				if (word === "please" || word === "plz" || word === "pls") {
					please = true;
					
				}

			}

		}

		return {
			count : offenses.length,
			text : offenses
		};
	}

	return {
		rant : function() {
			return rant();
		},
		plsRT : function() {
			return plsRT();
		}
	};
};