describe("NARCISSISM", function () {

    var insights, narcissism;

    beforeEach(function (done) {
        $.getJSON('../data/bryce.json').done(function (data) {
            insights = new Insights(data);
            narcissism = insights.narcissism();

            done();
        });
    });

    it("should return non-null insight properties", function (done) {

        expect(typeof narcissism.counts).toBe("object");
        expect(Object.keys(narcissism.counts).length).toEqual(8);
        expect(typeof narcissism.narcTweetCount).toBe("number");
        expect(typeof narcissism.narcTweets).toBe("object");
        expect(typeof narcissism.narcTweetsPercent).toBe("number");

        done();
    });

    it("percents and counts should add up", function (done) {

        var total = 0;

        for (var key in narcissism.counts) {
            var wordCount = narcissism.counts[key];

            total += wordCount;
        }

        expect(total).toBeGreaterThan(narcissism.narcTweetCount);
        expect(narcissism.narcTweetCount).toEqual(narcissism.narcTweets.length);
        expect(narcissism.narcTweetsPercent).toBeGreaterThan(0);
        expect(narcissism.narcTweetsPercent).toBeLessThan(100);

        if (narcissism.narcTweets.length > 0) {

            for (var i = 0; i < narcissism.narcTweets.length; i++) {
                var tweet = narcissism.narcTweets[i];

                expect(typeof tweet).toBe("string");

            }

        }
        done();
    });


});