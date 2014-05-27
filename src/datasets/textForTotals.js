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
						;
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
			tweet = _.compact(tweet);
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
						/[\,-@\/$%\^&\*;:{}=\-_`~()]/g, "");
				var finalString = punctuationless.replace(/\s{2,}/g, "");

				tweet[k] = finalString.toLowerCase();

			}
			// remove falsey values, including ""
			tweet = _.compact(tweet);
		}

		return results;

	}

	this.textTotals = {
		wordLevel : scrubForWords(),
		sentenceLevel : scrubForSentences(),
		fullText:text
	};

	return this.textTotals;
};