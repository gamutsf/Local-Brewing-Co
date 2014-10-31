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
<script src="js/iscroll.js"></script>

<script type="text/javascript">

	window.viewportUnitsBuggyfill.init();
	window.preventDefault = function(e) { e.preventDefault(); };

	var beerProfile = new Object();
			beerProfile.hoppy = 0;
			beerProfile.boozy = 0;
			beerProfile.complex = 0;
	
	// Global matches array
			
	var output = [];
			
	/* Test user account related stuff */
	
	var user = new Object();
	
			
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
	<section pos-view="menu" class="pos-invisible overlay"></section>