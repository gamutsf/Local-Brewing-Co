var	SingleView = function ()
{
	console.log ("SingleView()");
	
	positron.View.call (this);
};
positron.inherits (SingleView, positron.View);

SingleView.prototype.onDOMReady = function ()
{
	console.log ("SingleView.onDOMReady()");
	
	//window.scrollTo(0, 0);
	
	/**************/
	// Scrolling
	/**************/
  
  // Fix scrolling in details section
  var scrollable = document.querySelector(".single");
	new ScrollFix(scrollable);
	
	// Prevent event page from moving while open
	/*
	document.querySelector('.location-more').addEventListener('touchmove', function (e) { 
		e.preventDefault(); 
	});
	*/
	
	function convertValues(input){		
		switch (input) {
	    case 1:
        return 181;
	    case 2:
        return 160;
      case 3:
        return 140;
      case 4:
        return 120;
      case 5:
        return 100;
      case 6:
        return 80;
      case 7:
        return 60;
      case 8:
        return 40;
      case 9:
        return 20;
      case 10:
        return 0;
		}
	}
	
	
	// Beer Profile Graph
	function makeBeerGraph(a,b,c){
		
		if((a && b && c) > 0){
			$('svg#beerGraph').html('<polygon points="0,182 52,'+ convertValues(parseInt(a)) +' 157,'+ convertValues(parseInt(b)) +' 262,'+ convertValues(parseInt(c)) +' 315,182" style="fill:#ff0c00; width:100%;" />');
		}
		
	}
	
	makeBeerGraph(
		this.params.hoppyness, 
		this.params.alcohol, 
		this.params.complexity
	);
	
	
	// User Profile Graph
	function makeProfileGraph(a,b,c){
	
		// x157 = hoppyness
		// x262 = alcohol
		// x315 = complexity
		
		if((a && b && c) > 0){
			$('svg#profileGraph').html('<polygon points="0,182 52,'+ convertValues(parseInt(a)) +' 157,'+ convertValues(parseInt(b)) +' 262,'+ convertValues(parseInt(c)) +' 315,182" style="fill:#CCCCCC; width:100%;" />');
		}
		
	}
	
	makeProfileGraph(
		beerProfile.hoppy, 
		beerProfile.boozy, 
		beerProfile.complex
	);
}

