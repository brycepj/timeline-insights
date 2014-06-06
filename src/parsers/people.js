Insights.prototype.people = function () {

    var data = this.d, results, totals,
        peopleData = [];

    if (this.pp) {
        return this.pp;
    }

    (function () {

        for (var i = 0, max = data.length; i < max; i++) {
            var tweet = data[i],
                type = null,
                user = null,
                primary = null,
                users = tweet.entities.user_mentions;
            // set type

            if (tweet.in_reply_to_screen_name) {
                type = "reply";
                user = tweet.in_reply_to_screen_name;
            } else if (tweet.retweeted) {
                type = "retweet";
                if (users.length === 0) {
                    user = "account_deleted";
                } else {
                    user = users[0].screen_name;
                }
            } else {
                type = "statement";
            }

            users = _.pluck(users,"screen_name");
            users.push(user);
            users = _.compact(users);
            users = _.flatten(users);
            users = _.uniq(users);

            if (users.length > 0) {
                primary = users[0];

                if (users.length === 1) {
                    users = null;
                }
            } else {
                primary = null;
                users = null;
            }

            peopleData.push({
                type: type,
                primary:primary,
                users: users ? users : null
            });

        }
    })();

    function calcRetweets(){

        var retweets = _.filter(peopleData,function(tweet){
           return tweet.type === "retweet";
        }),
            allUsers = _.pluck(retweets,"primary"),
            favorites = _.countBy(allUsers,function(sn){
            return sn;
        });

        return {
            count:retweets.length,
            percent:Number(((retweets.length/peopleData.length)*100).toFixed(2)),
            favorites:favorites
        };
    }

    function calcReplies(){


        var replies = _.filter(peopleData,function(tweet){
           return tweet.type === "reply";
        }),
            allUsers = _.forEach(replies,function(tweet){

            if (tweet.users) {
                tweet.users.push(tweet.primary);
            } else {
                tweet.users = [tweet.primary];
            }
        });

        var favorites = _.pluck(allUsers,"users");
        favorites = _.flatten(favorites);
        favorites = _.countBy(favorites,function(sn){
            return sn;
        });


        return {
            count:replies.length,
            percent:Number(((replies.length/peopleData.length)*100).toFixed(2)),
            favorites:favorites
        };
    }

    function calcStatements(){

        var statements = _.filter(peopleData,function(tweet){
            return tweet.type === "statement";
        });

        var favorites = _.pluck(statements,"users");

        favorites = _.flatten(favorites);
        favorites = _.compact(favorites);
        favorites = _.countBy(favorites,function(sn){
            return sn;
        });

        return {
            count:statements.length,
            percent:Number(((statements.length/peopleData.length)*100).toFixed(2)),
            favorites:favorites
        };
    }

    this.pp = {
        totalTweets: peopleData.length,
        tweets: peopleData,
        retweets: calcRetweets(),
        replies: calcReplies(),
        statements: calcStatements()
    };

    results = this.pp;

    return results;
};