Insights.prototype.all = function () {

    var results;
    // in each function call, check for cached version, then if not available return prototype method call

    function getFauxpas() {
        console.log('this here runs');
    }

    function getHashtags() {
        console.log('this here runs');
    }

    function getNarcissism() {
        console.log('this here runs');
    }

    function getPeople() {
        console.log('this here runs');
    }

    function getProfanity() {
        console.log('this here runs');
    }

    function getReading() {
        console.log('this here runs');
    }

    function getSentiments() {
        console.log('this here runs');
    }

    function getVocabulary() {
        console.log('this here runs');
    }

    if (this.a) {
        return this.a;
    } else {

        results = {
            fauxpas: getFauxpas(),
            hashtags: getHashtags(),
            narcissism: getNarcissism(),
            people: getPeople(),
            profanity: getProfanity(),
            reading: getReading(),
            sentiments: getSentiments(),
            vocabulary: getVocabulary()
        };

        this.a = results;

        return results;
    }

};