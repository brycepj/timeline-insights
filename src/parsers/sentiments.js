Insights.prototype.sentiments = function() {
	
	var data = this.textForTotals(), fullText = data.fullText, tweets = data.wordLevel, lib = this
			.sentimentLib(),results;

	var negativeWords = [], positiveWords = [], balance = 0, negativeTweets = [], positiveTweets = [], neutralTweetCount = 0, totalWords = 0;

	if (this.sentimentTotals) {
		return this.sentimentTotals;
	}
	
	for (var i = 0; i < tweets.length; i++) {
		var tweet = tweets[i], currentBalance = 0, currentPositive = [], currentNegative = [];

		for (var j = 0; j < tweet.length; j++) {
			var word = tweet[j];
			totalWords++;

			for ( var key in lib) {
				var sent = key;
				var score = lib[key];

				if (word === sent) {
					if (score > 0) {
						positiveWords.push(sent);
						currentPositive.push(sent);

						balance += score;
						currentBalance += score;

					} else {
						negativeWords.push(sent);
						currentNegative.push(sent);

						balance += score;
						currentBalance += score;
					}

				}
			}

		}

		if (currentBalance > 0) {
			positiveTweets.push({
				text : fullText[i],
				negativeWords : currentNegative,
				positiveWords : currentPositive,
				balance : currentBalance
			});
		} else if (currentBalance < 0) {
			negativeTweets.push({
				text : fullText[i],
				negativeWords : currentNegative,
				positiveWords : currentPositive,
				balance : currentBalance
			});
		} else {

			neutralTweetCount++;

		}

	}

	negativeTweets = _.sortBy(negativeTweets, function(tweet) {
		return tweet.balance;
	});

	positiveTweets = _.sortBy(positiveTweets, function(tweet) {
		return tweet.balance;
	}).reverse();

	results = {
			negativeWords : negativeWords,
			positiveWords : positiveWords,
			negPosWords : negativeWords.concat(positiveWords),
			balance : balance,
			negativeTweets : negativeTweets,
			positiveTweets : positiveTweets,
			neutralTweetCount : neutralTweetCount,
			totalWords : totalWords
		};
	
	this.sentimentTotals  = results;
	
	return results;

};