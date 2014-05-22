Insights.prototype.sentiments = function () {

    var data = this.textForTotals(), fullText = data.fullText, tweets = data.wordLevel, lib = this.sentimentLib();

    var negativeWords = [], positiveWords = [], balance = 0, negativeTweets = [], positiveTweets = [], neutralTweetCount = 0, totalWords = 0;


    for (var i = 0; i < tweets.length; i++) {
        var tweet = tweets[i],
            tweetsToday = [];


        for (var j = 0; j < tweet.length; j++) {
            var word = tweet[j];



            for (var key in lib) {
                var sent = key;
                var score = lib[key];

                if (word === sent) {
                    if (score > 0) {
                        positiveWords.push(sent);


                    } else {
                        negativeWords.push(sent);
                    }

                    balance += score;
                }


            }


        }


        return {
            negativeWords: negativeWords,
            positiveWords: positiveWords,
            negPosWords: negativeWords.concat(positiveWords),
            balance: balance,
            negativeTweets: negativeTweets,
            positiveTweets: positiveTweets,
            neutralTweetCount: neutralTweetCount,
            totalWords: totalWords
        };

    }
    ;