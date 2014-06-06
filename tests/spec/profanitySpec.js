describe('profanity insights',function(){
	
	var insights,profanity;

	beforeEach(function(done) {
		$.getJSON('../data/bryce.json').done(function(data) {
			insights = new Insights(data);
			profanity = insights.profanity();

			done();
		});
	});
	
	it("should return non-null properties",function(done){
		
		expect(profanity).toBeDefined();
		expect(typeof profanity).toBe("object");
		
		expect(typeof profanity.count).toBe("object");
		expect(typeof profanity.frequency).toBe("number");
		expect(typeof profanity.percent).toBe("number");
		
		done();
	});
	
	describe('counts',function(){
	
		it('should positive integers as values', function(done){	

			var p = insights.profanity();
			var c = p.count;

			if (Object.keys(c).length > 0) {

				for (var key in c) {
					
					expect(c[key]).toBeGreaterThan(0);
				
				}
			}
		
			done();
		
		});
		
	});
	
	describe('percent',function(){
		
		it('should be a decimal',function(done){
			
			var percent = insights.profanity().percent;
			
			expect(percent >= 0).toBeTruthy();
			expect(percent).toBeLessThan(1);

			done();
		});
		
		
	});
	
	describe('frequency',function(){
		
		it('should be less often than every tweet',function(done){
			
			var frequency = insights.profanity().frequency;
			
			expect(frequency >= 1).toBeTruthy();

			done();
		});
		
		
	});
	
});