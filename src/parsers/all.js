Insights.prototype.all = function (obj) {

    var results;
    // in each function call, check for cached version, then if not available return prototype method call

    function getFauxpas() {
    	if (this.fp) {
        	return this.fp;
        } else {
        	return obj.fauxpas();
        }
    }

    function getHashtags() {
    	if (this.ht) {
        	return this.ht;
        } else {
        	return obj.hashtags();
        }
    }

    function getNarcissism() {
    	if (this.nc) {
        	return this.nc;
        } else {
        	return obj.narcissism();
        }
    }

    function getPeople() {
    	if (this.pp) {
        	return this.pp;
        } else {
        	return obj.people();
        }
    }

    function getProfanity() {
    	if (this.pf) {
        	return this.pf;
        } else {
        	return obj.profanity();
        }
    }

    function getReading() {
    	if (this.rd) {
        	return this.rd;
        } else {
        	return obj.reading();
        }
    }

    function getSentiments() {
    	if (this.st) {
        	return this.st;
        } else {
        	return obj.sentiments();
        }
    }

    function getVocabulary() {
    	if (this.vc) {
        	return this.vc;
        } else {
        	return obj.vocabulary();
        }
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