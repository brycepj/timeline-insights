describe("HASHTAGS", function () {
    var insights, hashtags;

    beforeEach(function (done) {
        $.getJSON('../data/bryce.json').done(function (data) {
            insights = new Insights(data);
            hashtags = insights.hashtags();
            done();
        });
    });


    it("returns insight categories", function (done) {

        expect(typeof hashtags.favorites).toBe("object");
        expect(typeof hashtags.sins).toBe("object");
        expect(typeof hashtags.totals).toBe("object");
        expect(typeof hashtags.usage).toBe("object");

        done();
    });

    describe("sins", function () {

        it("should contain correct property types", function (done) {

            var sins = hashtags.sins;

            expect(typeof sins.counts).toBe("number");

            if (sins.counts > 0) {

                expect(sins.tweets.length).toEqual(sins.counts);

                for (var i = 0; i < sins.tweets.length; i++) {

                    var tweet = sins.tweets[i];

                    expect(typeof tweet.index).toBe("number");
                    expect(typeof tweet.text).toBe("string");

                    for (var j = 0; j < tweet.length; j++) {

                        var word = tweet[j];

                        expect(typeof word).toBe("string");
                    }

                }
            }

            done();
        });


    });


    describe("favorites", function () {

        it("should have returned numbers > 1", function (done) {

            var favorites = hashtags.favorites;

            for (var key in favorites) {

                expect(typeof favorites[key]).toBe("number");
                expect(favorites[key]).toBeGreaterThan(1);
            }

            done();
        });

    });


    describe("totals", function () {

        it("returns two arrays", function (done) {

            var totals = hashtags.totals;

            expect(typeof totals.allHashtags).toBe("object");
            expect(typeof totals.tweets).toBe("object");

            done();
        });

        it("allHashtags array should only return strings", function (done) {

            var totals = hashtags.totals;

            if (totals.allHashtags.length > 0) {

                for (var i = 0, max = totals.allHashtags.length; i < max; i++) {
                    var ht = totals.allHashtags[i];

                    expect(typeof ht).toBe("string");

                }
            }

            done();
        });

        it("tweets array should return proper values", function (done) {

            var tweets = hashtags.totals.tweets;

            if (tweets.length > 0) {
                for (var i = 0; i < tweets.length; i++) {
                    var tweet = tweets[i];

                    expect(typeof tweet).toBe("object");
                    expect(typeof tweet.count).toBe("number");
                    expect(tweet.count).toBeGreaterThan(0);
                    expect(tweet.count).toEqual(tweet.hashtags.length);
                    expect(typeof tweet.index).toBe("number");
                    expect(typeof tweet.text).toBe("string");

                    for (var j = 0; j < tweet.hashtags.length; j++) {
                        var ht = tweet.hashtags[j];

                        expect(typeof ht).toBe("string");

                    }
                }
            }

            done();
        });


    });

    describe("usage", function () {

        it("should return numbers > 0", function (done) {
            var usage = hashtags.usage;

            expect(Object.keys(usage).length).toBeGreaterThan(0);
            expect(usage["0"]).toBeDefined();

            for (var key in usage) {
                expect(typeof usage[key]).toBe("number");
                expect(usage[key]).toBeGreaterThan(0);
            }

            done();
        });
    });


});