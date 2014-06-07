describe("READING", function () {

    var insights, reading;

    beforeEach(function (done) {
        $.getJSON('../data/bryce.json').done(function (data) {
            insights = new Insights(data);
            reading = insights.reading();

            done();
        });
    });

    it("returns correct types", function (done) {

        expect(typeof reading.flesch.ease).toBe("number");
        expect(typeof reading.flesch.grade).toBe("number");
        expect(typeof reading.fog).toBe("number");
        expect(typeof reading.totals).toBe("object");
        expect(typeof reading.tweets).toBe("object");


        done();
    });

    it("should return values within normal ranges", function (done) {

        var flesch = reading.flesch;

        expect(flesch.ease).toBeLessThan(100);
        expect(flesch.ease).toBeGreaterThan(0);

        expect(flesch.grade).toBeLessThan(13);
        expect(flesch.grade).toBeGreaterThan(0);

        expect(reading.fog).toBeLessThan(13);
        expect(reading.fog).toBeGreaterThan(0);


        done();
    });


    describe("totals", function () {

        it("should contain only numbers and reasonable values", function (done) {

            var totals = reading.totals;

            for (var key in totals) {
                expect(typeof totals[key]).toBe("number");
            }

            expect(totals.longWordsPerSentence).toBeLessThan(5);
            expect(totals.longWordsPerSentence).toBeGreaterThan(0);

            expect(totals.percentLongWords).toBeLessThan(100);
            expect(totals.percentLongWords).toBeGreaterThan(0);

            expect(totals.syllablesPerWord).toBeLessThan(4);
            expect(totals.syllablesPerWord).toBeGreaterThan(0);

            expect(totals.wordsPerSentence).toBeLessThan(30);
            expect(totals.wordsPerSentence).toBeGreaterThan(0);

            done();
        });

    });

    describe("individual tweets",function(){


        it("should be comprised of correct types",function(done){

            var tweets = reading.tweets;

            expect(typeof tweets).toBe("object");

            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i];

                expect(typeof tweet.avgSyllables).toBe("number");
                expect(tweet.avgSyllables).toBeLessThan(10);
                expect(typeof tweet.bigWords).toBe("object");
                expect(tweet.bigWords.length).toBeLessThan(15);
                expect(typeof tweet.sentenceCount).toBe("number");
                expect(tweet.sentenceCount).toBeGreaterThan(0);
                expect(typeof tweet.text).toBe("string");
                expect(typeof tweet.wordCount).toBe("number");

            }



            done();
        });





    });

});