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
}

