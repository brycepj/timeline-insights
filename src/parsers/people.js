Insights.prototype.people = function() {

	var data = this.d, 
		peopleData = [];
	
	
	for (var i = 0; i < data.length; i++) {
		var tweet = data[i];
		
		
		
		
		peopleData.push({
			replyTo:tweet.in_reply_to_screen_name,
			retweeted:tweet.retweeted,
			text:tweet.text
		})
		
	}

};