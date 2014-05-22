Insights.prototype.hashtags = function() {

	var data = this.tweetsWithDates();
	var allHashtags = [];
	var tweets = [];
	var totals,results;
	

	// why isn't this caching?
	// And why so slow?
	
	if (this.hashtagTotals) {
		this.hashtagTotals;
	}

	(function() {
		for (var i = 0; i < data.length; i++) {
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
					index:i
				});
			}
			
		}
		
		totals = {
				allHashtags:allHashtags,
				tweets:tweets
		};
	})();
	
	function countUsage() {
		
		var counts = _.pluck(totals.tweets,"count");
		counts = _.countBy(counts,function(count){
			return count;
		});
		
		counts["0"] = data.length - tweets.length;
		
		return counts;
		
	}
	
	function countFavorites(){
		var counts = _.countBy(totals.allHashtags,function(hashtag){
			return hashtag;
		});
		
		counts = _.omit(counts,function(val){
			return val < 2;
		});
		
		return counts;
	}
	
	function countSins(){
		var sins = _.filter(totals.tweets,function(tweet){
			return tweet.count > 2;
		});
		
		sins = _.sortBy(sins,function(tweet){
			return tweet.count;
		});
		
		return {
			tweets:sins.reverse(),
			counts:sins.length
		};
	}
	
	this.hashtagTotals = {
			totals:totals,
			usage:countUsage(),
			favorites:countFavorites(),
			sins:countSins()
	};
	
	results = this.hashtagTotals;
	
	return results;
};

