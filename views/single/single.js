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
	
	var myScroll;
	
	myScroll = new IScroll('#wrapper', {
		scrollX: true,
		scrollY: false,
		momentum: false,
		snap: true
	});
	
	console.log(output.length);
	
	var winWidth = $(window).width();
	$('#scroller').css('width', '-webkit-calc('+ winWidth * output.length +'px)');
	myScroll.refresh();
	
	$('.single-details').each(function(i){
		$(this).attr({'id': i});
	});
	
	
	function adjustHeight(){
		var height = $('.single-details').eq(myScroll.currentPage.pageX).outerHeight(true);
		$('#wrapper').css('height', height);
	}
	
	
	$('.single-details').eq(myScroll.currentPage.pageX).addClass('active');
	adjustHeight();
	
	myScroll.on('scrollEnd', function () {
	
		$('.single-details').removeClass('active');
		$('.single-details').eq(myScroll.currentPage.pageX).addClass('active');
		
		adjustHeight();
		
	});
	
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
	
		console.log('makeBeerGraph()');
		console.log(a);
		console.log(b);
		console.log(c);
		
		if((a && b && c) > 0){
			var beerGraph = document.getElementById('beerPoly');
					beerGraph.setAttribute('points', '0,182 52,'+ convertValues(parseInt(a)) +' 157,'+ convertValues(parseInt(b)) +' 262,'+ convertValues(parseInt(c)) +' 315,182');
		}
		
	}
	
	
	// User Profile Graph
	function makeProfileGraph(a,b,c){
	
		console.log('makeProfileGraph()');
		console.log(a);
		console.log(b);
		console.log(c);
	
		// x157 = hoppyness
		// x262 = alcohol
		// x315 = complexity
		
		if((a && b && c) > 0){
			var profileGraph = document.getElementById('profilePoly');
					profileGraph.setAttribute('points', '0,182 52,'+ convertValues(parseInt(a)) +' 157,'+ convertValues(parseInt(b)) +' 262,'+ convertValues(parseInt(c)) +' 315,182');
		}
		
	}
	
	
	makeBeerGraph(
		this.params.hoppyness, 
		this.params.alcohol, 
		this.params.complexity
	);
	
	makeProfileGraph(
		beerProfile.hoppy, 
		beerProfile.boozy, 
		beerProfile.complex
	);
}

SingleView.prototype.close = function ()
{
	setTimeout(function(){
		$('.beer-sum').removeClass('noclick');
	}, 401);
}

SingleView.prototype.share = function ()
{
	alert('Share: '+ this.params.name);
}

SingleView.prototype.fave = function ()
{
	alert(this.params.name + ' has been added to your favorites!');
}