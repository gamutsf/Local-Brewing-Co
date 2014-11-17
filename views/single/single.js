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
	
	/*
	This is for side scrolling functionality to
	be added at a later revision...
	**********
	
	var horzScroll;
	var winWidth = $(window).width();
	$('#scroller').css('width', (winWidth * output.length) +'px');
	
	horzScroll = new IScroll('#wrapper', {
		scrollX: true,
		scrollY: false,
		momentum: false,
		snap: true
	});
	
	$('.single-details').each(function(i){
		$(this).attr({'id': i});
	});
	*/
	
	function adjustHeight(){
		//var height = $('.single-details').eq(horzScroll.currentPage.pageX).outerHeight(true);
		
		var height = $('.single-details').outerHeight(true);
		$('#wrapper').css('height', height);
		
		//horzScroll.refresh();
	}
	
	
	//$('.single-details').eq(horzScroll.currentPage.pageX).addClass('active');
	
	adjustHeight();
	
	/*
	horzScroll.on('scrollEnd', function () {
	
		$('.single-details').removeClass('active');
		$('.single-details').eq(horzScroll.currentPage.pageX).addClass('active');
		
		adjustHeight();
		
	});
	*/
	
	/**************/
	// Scrolling
	/**************/
  
  // Fix scrolling in details section
  var scrollable = document.querySelector(".single-details");
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

SingleView.prototype.shareFacebook = function ()
{
	//alert('Facebook share: '+ this.params.name);
	
	var winWidth = 520;
	var winHeight = 350;
	var winTop = (screen.height / 2) - (winHeight / 2);
	var winLeft = (screen.width / 2) - (winWidth / 2);
	
	var name = this.params.name;
	
	var title = 'Local Brewing Co.'+ name;
  var descr = 'Check out "'+ name +'"';
	window.open('http://www.facebook.com/sharer.php?u=http://localbrewingco.com&t='+ descr, 'Local Brewing Co', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
	
}

SingleView.prototype.shareTwitter = function ()
{
	//alert('Twitter share: '+ this.params.name);
	
	var winWidth = 520;
  var winHeight = 350;
  var winTop = (screen.height / 2) - (winHeight / 2);
  var winLeft = (screen.width / 2) - (winWidth / 2);
	
	var name = this.params.name;
	
	var twitterUrl = 'http://twitter.com/intent/tweet?text=Check out "'+ name +'" http://localbrewingco.com @localbrewingco';		
	window.open(twitterUrl, 'Local Brewing Co', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
	
}

SingleView.prototype.fave = function ()
{
	var id = this.params.id;
	var name = this.params.name;
	 
	$.ajax({
  	url: "http://localbrewingco.com/cms/wp-admin/admin-ajax.php",
  	data: {
	    action: 'addFavorite',
	    beer_id: id,
	    user_id: localStorage.lbc_user
		},
		dataType: "jsonp",
		async: true,
		success: function (inData, inTextStatus, inXHR)
		{
      //console.log(inData.status + ': '+ name);
      
      if(inData.status == "exists"){
	      alert(name + ' is already a favorite.');
	    }
	    else if(inData.status == "added"){
    		console.log(name + ' has been added to your favorites!');
    	}
    	else {
	    	// Remove the active class
	    	$('.fave[data-faveid="'+ id +'"]').removeClass('active');
	    	console.log('Adding ' + name + ' did not work, removing...');
    	}
    	
    	Application.prototype.refreshUserdata.call(this);
		},
		error: function (inXHR, inTextStatus, inThing)
		{
			console.log(inXHR + inTextStatus + inThing);
		}
  });
}

SingleView.prototype.unfave = function ()
{
	var id = this.params.id;
	var name = this.params.name;
	
	$.ajax({
  	url: "http://localbrewingco.com/cms/wp-admin/admin-ajax.php",
  	data: {
	    action: 'removeFavorite',
	    beer_id: this.params.id,
	    user_id: localStorage.lbc_user
		},
		dataType: "jsonp",
		async: true,
		success: function (inData, inTextStatus, inXHR)
		{
      console.log(inData.status + ': '+ name);
		},
		error: function (inXHR, inTextStatus, inThing)
		{
			console.log(inXHR + inTextStatus + inThing);
		}
  });
}

SingleView.prototype.refreshFaves = function ()
{
	positron.Util.ajax({
		url: "http://localbrewingco.com/cms/user/?userid="+ localStorage.lbc_user,
		dataType: "jsonp",
		success: function(inData){
		
			var cacheKey = 'userdata';
		  var cacheLifeTime = 15 * 60 * 1000;
		  gApplication.cache.put(cacheKey, inData, cacheLifeTime);
		  
		}
	});
}