Insights.prototype.hashtags = function() {

	var data = this.d,
        allHashtags = [],
        tweets = [],
        totals,
        results;

	if (this.ht) {
		return this.ht;
	}

	(function() {
		for (var i = 0, max = data.length; i < max; i++) {
			var tweet = data[i], hashtags = tweet.entities.hashtags, currentHashtags = [];
			if (hashtags.length > 0) {

				for (var j = 0; j < hashtags.length; j++) {
					var hashtag = hashtags[j].text;

					allHashtags.push(hashtag);
					currentHashtags.push(hashtag);

				}

			}

			if (hashtags.length > 0) {

				tweets.push({
					count : hashtags.length,
					hashtags : currentHashtags,
					text : data[i].text,
					index : i
				});
			}

		}

		totals = {
			allHashtags : allHashtags,
			tweets : tweets
		};
	})();

	function countUsage() {

		var counts = _.pluck(totals.tweets, "count");
		counts = _.countBy(counts, function(count) {
			return count;
		});

		counts["0"] = data.length - tweets.length;

		return counts;

	}

	function countFavorites() {
		var counts = _.countBy(totals.allHashtags, function(hashtag) {
			return hashtag;
		});

		counts = _.omit(counts, function(val) {
			return val < 2;
		});

		return counts;
	}

	function countSins() {
		var sins = _.filter(totals.tweets, function(tweet) {
			return tweet.count > 2;
		});

		sins = _.sortBy(sins, function(tweet) {
			return tweet.count;
		});

		return {
			tweets : sins.reverse(),
			counts : sins.length
		};
	}

	this.ht = {
		totals : totals,
		usage : countUsage(),
		favorites : countFavorites(),
		sins : countSins()
	};

	results = this.ht;

	return results;
};
