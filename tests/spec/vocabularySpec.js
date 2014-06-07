describe("VOCABULARY",function(){

    var insights,vocab;

    beforeEach(function (done) {
        $.getJSON('../data/bryce.json').done(function (data) {
            insights = new Insights(data);
            vocab = insights.vocabulary();

            done();
        });
    });


    it("should have totalWords counted properly",function(done){

        expect(typeof vocab.totalWords).toBe("number");

        done();
    });

    it("should save only non-null numbers",function(done){

        expect(typeof vocab.uniqueWords).toBe("object");

        for (var i = 0; i < vocab.uniqueWords.length; i++) {
            var word = vocab.uniqueWords[i];

            expect(typeof word).toBe("string");

        }
        
        done();
    });


});