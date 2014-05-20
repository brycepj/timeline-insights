Insights.prototype.profanity = function() {

	// array of all words used
	var data = _.flatten(this.textForTotals().wordLevel), lib = this
			.profanityLib(), uses = [], wordCount = 0, count;

	(function() {
		for (var i = 0; i < data.length; i++) {
			var word = data[i];

			for (var j = 0; j < lib.length; j++) {
				var prof = lib[j];

				if (word === prof) {
					uses.push(word);
					
				}
				
				wordCount++;	
			}
		}

	})();

	function getCounts() {
		count = _.groupBy(uses.sort(), function(val) {
			return val;
		});

		for ( var key in count) {
			var arr = count[key];
			count[key] = arr.length;
		}

		return count;

	}

	return {
		count : getCounts(),
		frequency : (wordCount / uses.length).toFixed(0),
		percent : ((uses.length / wordCount) * 100).toFixed(8)
	};
};