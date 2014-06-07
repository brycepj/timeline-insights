describe("SENTIMENTS", function () {

    var insights, sentiments;

    beforeEach(function (done) {
        $.getJSON('../data/bryce.json').done(function (data) {
            insights = new Insights(data);
            sentiments = insights.sentiments();

            done();
        });
    });

    it("should return non-null datasets", function (done) {

        expect(typeof sentiments.balance).toBe("number");
        expect(typeof sentiments.negPosWords).toBe("object");
        expect(typeof sentiments.negativeTweets).toBe("object");
        expect(typeof sentiments.negativeWords).toBe("object");
        expect(typeof sentiments.neutralTweetCount).toBe("number");
        expect(typeof sentiments.positiveTweets).toBe("object");
        expect(typeof sentiments.positiveWords).toBe("object");
        expect(typeof sentiments.totalWords).toBe("number");

        done();
    });

    describe("negPosWords", function () {

        it("should contain strings", function (done) {

            for (var i = 0; i < sentiments.negPosWords.length; i++) {

                if (i % 3 === 0) {

                    expect(typeof sentiments.negPosWords[i]).toBe("string");

                }

            }

            done();
        });

        it("should add up", function (done) {

            var np = sentiments.negPosWords.length;
            var n = sentiments.negativeWords.length;
            var p = sentiments.positiveWords.length;

            expect(n + p).toEqual(np);

            done();
        });


    });

    describe("negativeTweets", function () {

        it("should have the correct types", function (done) {

            var tweets = sentiments.negativeTweets;

            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i];

                if (i % 2 === 0) {

                    expect(typeof tweet.balance).toBe("number");
                    expect(typeof tweet.negativeWords).toBe("object");
                    expect(typeof tweet.positiveWords).toBe("object");
                    expect(typeof tweet.text).toBe("string");

                }

            }

            done();
        });

        it("should have a sensible balance", function (done) {
            var tweets = sentiments.negativeTweets;

            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i];

                expect(tweet.balance).toBeLessThan(0);
            }

            done();
        });


    });

    describe("positiveTweets", function () {

        it("should have the correct types", function (done) {

            var tweets = sentiments.positiveTweets;

            for (var i = 0; i < tweets.length; i++) {

                var tweet = tweets[i];

                expect(typeof tweet.balance).toBe("number");
                expect(tweet.balance).toBeGreaterThan(0);
                expect(typeof tweet.negativeWords).toBe("object");
                expect(typeof tweet.positiveWords).toBe("object");
                expect(typeof tweet.text).toBe("string");

            }

            done();
        });

    });


});