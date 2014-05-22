Insights.prototype.reading = function() {

	var results = [];
	var data = this.textForTotals().sentenceLevel;
	var fullText = this.textForTotals().fullText;
	var readingPerTweet = [];
	var totals;
	
	if (this.readingTotals) {
		return this.readingTotals;
	}

	// store reading data for each tweet
	(function() {

		for (var i = 0; i < data.length; i++) {

			// remove words that are ""

			var tweet = _.compact(data[i]), currentSyllables = 0, bigWords = [];

			// count sentences from the fullText

			var sentences = fullText[i].split(/[.|!|?]\s/gi);

			for (var j = 0; j < tweet.length; j++) {
				var word = tweet[j];

				var syllables = (function() {

					word = word.toLowerCase(); // word.downcase!
					if (word.length <= 3) {
						return 1;
					} // return 1 if word.length <= 3
					word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); // word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,
					// '')
					word = word.replace(/^y/, '');
					if (!word.match(/[aeiouy]{1,2}/g)) {
						return 1;
					}
					// word.sub!(/^y/, '')
					return word.match(/[aeiouy]{1,2}/g).length; // word.scan(/[aeiouy]{1,2}/).size
				})();

				currentSyllables += syllables;

				if (syllables >= 3) {
					bigWords.push(word);
				}
			}

			readingPerTweet.push({
				avgSyllables : isNaN(currentSyllables / tweet.length)? 1:(currentSyllables / tweet.length).toFixed(2),
				bigWords : bigWords,
				text : fullText[i],
				sentenceCount : sentences.length,
				wordCount : tweet.length
			});
		}

	})();

	function getTotals() {

		var data = readingPerTweet,
			totalTweets = data.length,
			bigWords = [],
			totalSyllables = 0,
			totalWords = 0,
			totalSentences = 0;
			
			
		for (var i = 0; i < data.length; i++) {

			var tweet = data[i];
			
			totalSyllables += Number(tweet.avgSyllables);
			totalWords += tweet.wordCount;
			totalSentences += tweet.sentenceCount;
			bigWords.push(tweet.bigWords);
			
		}
		
		totals = {
				wordsPerSentence:(totalWords/totalSentences).toFixed(2),
				syllablesPerWord:(totalSyllables/data.length).toFixed(2),
				percentLongWords:((bigWords.length/totalWords) * 100).toFixed(2),
				longWordsPerSentence:(bigWords.length/totalSentences).toFixed(2)
			};
		
		return totals;
	}

	function getFlesch() {
		var data = totals;
		
		var WPS = data.wordsPerSentence;
		var SPW = data.syllablesPerWord;
		
		
		return {
			grade : ((0.39 * Number(WPS)) + (11.8 * Number(SPW)) - 15.59).toFixed(2),
			ease : (206.835 - (1.015 * Number(WPS)) - (84.6 * Number(SPW))).toFixed(2),
		};
	}

	function getFog() {
		var data = totals;
		var ASL = Number(data.wordsPerSentence);
		var PHW = Number(data.percentLongWords);
		
		return (0.4*(ASL + PHW)).toFixed(2);
	}
	
	getTotals();
	
	this.readingTotals = {
		fog : getFog(),
		flesch : getFlesch(),
		totals:totals,
		tweets : readingPerTweet
	};

	results = this.readingTotals;

	return results;

};