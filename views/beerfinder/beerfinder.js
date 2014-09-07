var	BeerfinderView = function () {
	console.log ("BeerfinderView()");
	
	positron.View.call (this);

};

positron.inherits (BeerfinderView, positron.View);

BeerfinderView.prototype.onDOMReady = function () {
	console.log ("BeerfinderView.onDOMReady()");
	
	
	/* update hoppyness */
	
	$(document).on('click touchend', '#hoppy-subtract', function(){
		if( (beerProfile.hoppy - 1) > 0 ){
			beerProfile.hoppy -= 1;
			updateHoppy();
		}
		
		console.log(beerProfile.hoppy);
	});
	
	$(document).on('click touchend', '#hoppy-add', function(){
		if( (beerProfile.hoppy + 1) <= 11 ){
			beerProfile.hoppy += 1;
			updateHoppy();
		}
		
		console.log(beerProfile.hoppy);
	});
	
	/* update boozyness */	
	
	$(document).on('click touchend', '#boozy-subtract', function(){
		if( (beerProfile.boozy - 1) > 0 ){
	 		beerProfile.boozy -= 1;
	 		updateBoozy();
		}
		
		console.log(beerProfile.boozy);
	});
	
	$(document).on('click touchend', '#boozy-add', function(){
		if( (beerProfile.boozy + 1) <= 11 ){
			beerProfile.boozy += 1;
			updateBoozy();
		}
		
		console.log(beerProfile.boozy);
	});
	
	/* update complexity */
	
	$(document).on('click touchend', '#complex-subtract', function(){
		if( (beerProfile.complex - 1) > 0 ){
	 		beerProfile.complex -= 1;
	 		updateComplex();
		}
		
		console.log(beerProfile.complex);
	});
	
	$(document).on('click touchend', '#complex-add', function(){
		if( (beerProfile.complex + 1) <= 11 ){
			beerProfile.complex += 1;
			updateComplex();
		}
		
		console.log(beerProfile.complex);
	});
	
	
	
	
	function updateHoppy() {
		$('#hoppy-level').html(beerProfile.hoppy);
		console.log('updating hops');
	}
	
	function updateBoozy() {
		$('#boozy-level').html(beerProfile.boozy);
		console.log('updating booze');
	}
	
	function updateComplex() {
		$('#complex-level').html(beerProfile.complex);
		console.log('updating complex');
	}

}
