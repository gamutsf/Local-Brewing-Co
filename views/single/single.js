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
        return 150;
	    case 2:
        return 133;
      case 3:
        return 116;
      case 4:
        return 100;
      case 5:
        return 83;
      case 6:
        return 66;
      case 7:
        return 50;
      case 8:
        return 33;
      case 9:
        return 17;
      case 10:
        return 0;
		}
	}
	
	
	// Beer Profile Graph
	function makeBeerGraph(a,b,c){
	
		var beerGraph = document.getElementById('beerGraph').getContext('2d');
		beerGraph.fillStyle = '#ff0c00';
		beerGraph.beginPath();
		beerGraph.moveTo(0, 150); // x0, y182 is bottom left
		beerGraph.lineTo(50, convertValues(parseInt(a))); // x50 is hoppyness (a)
		beerGraph.lineTo(150, convertValues(parseInt(b))); // x150 is alcohol (b)
		beerGraph.lineTo(250, convertValues(parseInt(c))); // x250 is complexity (c)
		beerGraph.lineTo(300, 150);
		beerGraph.closePath();
		beerGraph.fill();
		
	}
	
	makeBeerGraph(
		this.params.hoppyness, 
		this.params.alcohol, 
		this.params.complexity
	);
	
	
	// User Profile Graph
	function makeProfileGraph(a,b,c){
	
		var beerGraph = document.getElementById('profileGraph').getContext('2d');
		beerGraph.fillStyle = '#CCC';
		beerGraph.beginPath();
		beerGraph.moveTo(0, 150); // x0, y182 is bottom left
		beerGraph.lineTo(50, convertValues(parseInt(a))); // x50 is hoppyness (a)
		beerGraph.lineTo(150, convertValues(parseInt(b))); // x150 is alcohol (b)
		beerGraph.lineTo(250, convertValues(parseInt(c))); // x250 is complexity (c)
		beerGraph.lineTo(300, 150);
		beerGraph.closePath();
		beerGraph.fill();
		
	}
	
	makeProfileGraph(
		beerProfile.hoppy, 
		beerProfile.boozy, 
		beerProfile.complex
	);
}

