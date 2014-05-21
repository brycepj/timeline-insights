Insights.prototype.vocabulary = function(){
	
	var data = this.textForTotals().sentenceLevel, equiv,
	allWords = _.flatten(data);
	uniqueWords = _.chain(allWords).compact()
	.map(function(word){
		var punctuationless = word.replace(
				/[\,.!-@\/$%\^&\*;:{}=\-_`~()]/g, "");
		return punctuationless.replace(/\s{2,}/g, "");
	})
	.uniq();
	
	uniqueWords = uniqueWords.value();
	
	(function(){
		var TOTAL = 35000;
		
		var multiple = (TOTAL/allWords.length);
		
		equiv = uniqueWords.length * multiple;
		
	})();
	
	return {
		uniqueWords:uniqueWords,
		totalWords:allWords.length,
		uniquePer35k: {
			self:Number(equiv.toFixed(0)),
			melville: 6022,
			shakespeare:5170,
			DMX:3214,
			aesopRock:7392,
			reference:"http://rappers.mdaniels.com"	
		}
	};
};