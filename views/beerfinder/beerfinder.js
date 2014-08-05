var hoppy = 5;
var boozy = 5;
var complex = 5;

var	BeerfinderView = function () {
	console.log ("BeerfinderView()");
	
	positron.View.call (this);

};

positron.inherits (BeerfinderView, positron.View);

BeerfinderView.prototype.onDOMReady = function () {
	console.log ("BeerfinderView.onDOMReady()");
	
	
	console.log(hoppy);
	console.log(boozy);
	console.log(complex);	

	
	/* update hoppyness */
	
	$(document).on('click', '#hoppy-subtract', function(){
	 	hoppy -= 1;
		updateHoppy();
		console.log(hoppy);
	});
	
	$(document).on('click', '#hoppy-add', function(){
		hoppy += 1;
		updateHoppy();
		console.log(hoppy);
	});
	
	/* update boozyness */	
	
	$(document).on('click', '#boozy-subtract', function(){
	 	boozy -= 1;
		updateBoozy();
		console.log(boozy);
	});
	
	$(document).on('click', '#boozy-add', function(){
		boozy += 1;
		updateBoozy();
		console.log(boozy);
	});
	
	/* update complexity */
	
	$(document).on('click', '#complex-subtract', function(){
	 	complex -= 1;
		updateComplex();
		console.log(complex);
	});
	
	$(document).on('click', '#complex-add', function(){
		complex += 1;
		updateComplex();
		console.log(complex);
	});
	
	
	
	
	function updateHoppy() {
		$('#hoppy-level').html(hoppy);
		console.log('updating hops');
	}
	
	function updateBoozy() {
		$('#boozy-level').html(boozy);
		console.log('updating booze');
	}
	
	function updateComplex() {
		$('#complex-level').html(complex);
		console.log('updating complex');
	}

}
