describe('FAUXPAS', function() {

	var insights;

	beforeEach(function(done) {
		$.getJSON('../data/bryce.json').done(function(data) {
			insights = new Insights(data);
			// Signal test to start
			done();
		});
	});

	describe('plsRT', function() {
		
		it('should return non-null values', function(done) {
			
			var fp = insights.fauxpas(),
				plsRT = fp.plsRT,
				count = plsRT.count;
			
			expect(fp).toBeDefined();
			expect(typeof fp.plsRT).toBe("object");
			expect(count).toBeGreaterThan(-1);

			done();
		});

		it('should have tweets stored as strings', function(done) {
			
			var fp = insights.fauxpas(),
				plsRT = fp.plsRT,
				count = plsRT.count,
				textArray = plsRT.text;
			
			if (count > 0) {
			
				expect(typeof textArray[0]).toBe('string');
				
			} else {
				
				expect(textArray.length).toBe(0);
			}
			
			done();
		});

	});
	
	describe('rants',function(){
		
		it('should return non-null values',function(done){
			
			var rant = insights.fauxpas().rant;
			var count = rant.count;
			var times = rant.times;
			
			expect(typeof rant).toBe("object");
			expect(count).toBeGreaterThan(-1);
			expect(typeof times).toBe("object");
			
			done();
			
		});
		
		it('should store rant dates properly',function(done){
			
			var rant = insights.fauxpas().rant;
			var count = rant.count;
			var times = rant.times;
			
			if (count > 0) {
				for (var key in times) {
					expect(typeof times[key]).toBe('number');
					expect(times[key]).toBeGreaterThan(0);
				}
			}
			
			done();
			
		})
		
		
	});

});