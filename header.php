<!DOCTYPE html>

<html>
<head>
<title>Local Brewing Co.</title>
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0" />

<!-- styles -->

<link href="positron/positron.css" type="text/css" rel="stylesheet"></link>
<link href="base.css" type="text/css" rel="stylesheet"></link>


<!-- scripts -->

<script src="positron/prefixfree.min.js" type="text/javascript"></script>
<script src="positron/prefixfree.dynamic-dom.min.js" type="text/javascript"></script>
<script src="positron/positron.js" type="text/javascript"></script>
<script src="js/viewport-units-buggyfill.js" type="text/javascript"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//maps.googleapis.com/maps/api/js?sensor=false"></script>
<script src="js/iscroll.js"></script>

<script type="text/javascript">
	
	window.hideKeyboard = function() {
    document.activeElement.blur();
    document.getElementsByTagName('input').blur();
	};

	window.viewportUnitsBuggyfill.init();
	window.preventDefault = function(e) { e.preventDefault(); };

	var beerProfile = new Object();
			beerProfile.hoppy = 0;
			beerProfile.boozy = 0;
			beerProfile.complex = 0;
	
	// Global matches array
			
	var output = [];
	
			
	/* Libs */
	
	/**
	 * ScrollFix v0.1
	 * http://www.joelambert.co.uk
	 *
	 * Copyright 2011, Joe Lambert.
	 * Free to use under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	
	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY, startTopScroll;
		
		elem = elem || document.querySelector(elem);
		
		// If there is no element, then do nothing	
		if(!elem)
			return;
	
		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;
			
			if(startTopScroll <= 0)
				elem.scrollTop = 1;
	
			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};
	
</script>

</head>

<body>
	
	<script>
	  window.fbAsyncInit = function() {
	    FB.init({
	      appId: '1530679393856403',
	      status: true, 
	      cookie: true, 
	      xfbml: true, 
	      oauth:true, 
	      version    : 'v2.2'
	    });
	  };
	
	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
	</script>
	
	<section p-view="menu" class="p-invisible overlay"></section>
	<section p-view="forms" class="single forms p-invisible" p-view-params="action: login;"></section>
	<section p-view="single" class="single p-invisible"></section>