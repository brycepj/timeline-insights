describe("PEOPLE", function () {

    var insights, people;

    beforeEach(function (done) {
        $.getJSON('../data/bryce.json').done(function (data) {
            insights = new Insights(data);
            people = insights.people();

            done();
        });
    });


    it("should return non-null properties", function (done) {

        expect(people.replies).toBeDefined();
        expect(people.retweets).toBeDefined();
        expect(people.statements).toBeDefined();
        expect(people.totalTweets).toBeDefined();
        expect(people.tweets).toBeDefined();

        done();
    });

    it("should add up",function(done){

        var repliesCount = people.replies.count;
        var repliesPercent = people.replies.percent;

        var retweetsCount = people.retweets.count;
        var retweetsPercent = people.retweets.percent;

        var statementsCount = people.statements.count;
        var statementsPercent = people.statements.percent;

        expect(repliesCount+retweetsCount+statementsCount).toEqual(people.totalTweets);
        expect(repliesPercent+retweetsPercent+statementsPercent).toBeCloseTo(100);
        expect(people.totalTweets).toEqual(people.tweets.length);

        done();
    });

    describe("replies", function () {

        it('should have non-null properties and proper types', function (done) {

            var replies = people.replies;

            expect(typeof replies.count).toBe("number");
            expect(typeof replies.favorites).toBe("object");
            expect(typeof replies.percent).toBe("number");

            if (Object.keys(replies.favorites).length > 0) {
                for (var key in replies.favorites) {
                    expect(replies.favorites[key]).toBeGreaterThan(0);
                }
            }


            done();
        });

    });


    describe("retweets", function () {

        it('should have non-null properties and proper types', function (done) {

            var retweets = people.retweets;

            expect(typeof retweets.count).toBe("number");
            expect(typeof retweets.favorites).toBe("object");
            expect(typeof retweets.percent).toBe("number");

            if (Object.keys(retweets.favorites).length > 0) {
                for (var key in retweets.favorites) {
                    expect(retweets.favorites[key]).toBeGreaterThan(0);
                }
            }


            done();
        });


    });

    describe("statements", function () {

        it('should have non-null properties and proper types', function (done) {

            var statements = people.statements;

            expect(typeof statements.count).toBe("number");
            expect(typeof statements.favorites).toBe("object");
            expect(typeof statements.percent).toBe("number");

            if (Object.keys(statements.favorites).length > 0) {
                for (var key in statements.favorites) {
                    expect(statements.favorites[key]).toBeGreaterThan(0);
                }
            }

            done();
        });

    });

    describe("total tweets", function () {

        it('should be equal to the length of the tweets array', function (done) {

            var total = people.totalTweets;

            expect(total).toEqual(people.tweets.length);

            done();
        });


    });

    describe("full tweets list", function () {

        it("should contain non-null property values", function (done) {

            var tweets = people.tweets;

            expect(typeof tweets).toBe('object');

            if (tweets.length > 0) {

                for (var i = 0, max = tweets.length; i < max; i++) {
                    var tweet = tweets[i];

                    expect(typeof tweet.type).toBe("string");

                    if (tweet.type !== "statement") {
                        expect(typeof tweet.users).toBe("object");
                        expect(typeof tweet.primary).toBe("string");
                    }

                }

            }

            done();
        });


    });


});