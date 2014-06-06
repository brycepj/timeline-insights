Insights.prototype.profanity = function() {

	var results;

	if (this.pf) {
		return this.pf;
	}
	// array of all words used
	var data = _.flatten(this.textForTotals().wordLevel), lib = this
			.profanityLib(), uses = [], wordCount = 0, count;

	(function() {
		for (var i = 0, max = data.length; i < max; i++) {
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

	this.pf = {
		count : getCounts(),
		frequency : Number((wordCount / uses.length).toFixed(0)),
		percent : Number(((uses.length / wordCount) * 100).toFixed(8))
	};

	results = this.pf;

	return results;
};