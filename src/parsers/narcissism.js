Insights.prototype.narcissism = function() {

	var data = this.textForTotals().wordLevel,
        fullText = this.textForTotals().fullText,
        narcList = [
			'i', 'me', 'my', 'mine', 'myself', "i've", "i'm", "i'd", 'ive',
			'im', 'id' ],
        results,
        narcUses = [],
        narcTweets = [],
        narcTweetCount = 0,
        narcPercent,
        counts;

	if (this.nc) {
		return this.nc;
	}

	for (var i = 0, max = data.length; i < max; i++) {

		var tweet = data[i],
            hasNarc = false;

		for (var k = 0; k < tweet.length; k++) {
			var word = tweet[k];

			for (var j = 0; j < narcList.length; j++) {
				var narcWord = narcList[j];

				if (word === narcWord) {
					narcUses.push(word);
					hasNarc = true;
				}
			}

		}

		if (hasNarc) {
			narcTweetCount++;
			narcTweets.push(fullText[i]);

		}
	}

	counts = _.countBy(narcUses, function(word) {
		return word;
	});

	this.nc = {
		narcTweetCount : narcTweetCount,
		counts : counts,
		narcTweetsPercent : Number(((narcTweetCount / data.length) * 100).toFixed(2)),
		narcTweets : narcTweets
	};

	results = this.nc;

	return results;

};