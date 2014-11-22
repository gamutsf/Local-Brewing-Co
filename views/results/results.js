/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	ResultsView = function ()
{
	//console.log ("ResultsView()");
	
	positron.View.call (this);
};

positron.inherits (ResultsView, positron.View);

ResultsView.prototype.onDOMReady = function ()
{
	console.log ("ResultsView.onDOMReady()");
	
	var self = this;
	
	// If we have something in history, run when the page loads
	$(window).load(function(){
		if( localStorage.lbc_saveprofile ){
			
			var profile = JSON.parse( localStorage.getItem('lbc_saveprofile') );
			
			// Now that we have it, remove it from LS
			localStorage.removeItem('lbc_saveprofile');
			
			beerProfile.hoppy = profile.hoppy;
			beerProfile.boozy = profile.boozy;
			beerProfile.complex = profile.complex;
			
			var params = new Object();
					params.section = 'save-profile';
			gApplication.showView('menu', params);
			
			$('.tab.hoppyness .filter-value').text(beerProfile.hoppy);
			$('.tab.alcohol .filter-value').text(beerProfile.boozy);
			$('.tab.complexity .filter-value').text(beerProfile.complex);
			
		}
		
		if( localStorage.lbc_favorite ){
			
			var favorite = JSON.parse( localStorage.getItem('lbc_favorite') );
			
			// Now that we have it, remove it from LS
			localStorage.removeItem('lbc_favorite');
			
			var params = new Object();
					params.id = favorite.id;
					params.name = favorite.name;
					params.hoppyness = favorite.hoppyness;
					params.alcohol = favorite.alcohol;
					params.complexity = favorite.complexity;
					params.action = 'savefavorite';
					 
			gApplication.showView('single', params);
			
			$('.beer-sum').addClass('noclick');
			
		}
	});
	
	self.rangeOutput();
	
	/*
	if(beerProfile.hoppy == 0){
		var hoppyness = 'All';
	}
	else {
		var hoppyness = beerProfile.hoppy;
	}
	*/
	
	$('.tab.hoppyness .filter-value').text(beerProfile.hoppy);
	$('.tab.alcohol .filter-value').text(beerProfile.boozy);
	$('.tab.complexity .filter-value').text(beerProfile.complex);
	
}

ResultsView.prototype.getProfile = function (){

	//console.log(beerProfile);
	//console.log(this.params);
	
	var el, newPoint, newPlace, offset;
	
	var section = this.params;
	
	 // Cache this for efficiency
	 el = $("input[type=range]");
	 
	 if(section != undefined){
	 
	 	 if(section.section == "hoppy"){
			 var curVal = beerProfile.hoppy;
		 }
		 if(section.section == "boozy"){
		 	 var curVal = beerProfile.boozy;
		 }
		 if(section.section == "complex"){
		 	 var curVal = beerProfile.complex;
		 }
		 
	 }
	 else {
		 var curVal = el.val();
	 }
	 
	 //console.log(beerProfile);	 
	 //console.log(section.section + ' value is: '+ curVal);
	 
	 el.val(curVal);	   
	 this.rangeOutput();
 
};

ResultsView.prototype.rangeOutput = function (){

	//console.log(beerProfile);
	//console.log(this.params);
	
	var el, newPoint, newPlace, offset;
	
	var section = this.params;
	//console.log(section);
	
	// Select all range inputs, watch for change
	$("input[type=range]").on('input change', function() {
	
	 //console.log('input or change event fired');
	 
	 console.log(gApplication.cache);
		
	 if(gApplication.cache.cache.userdata && gApplication.cache.cache.userdata.profiles){
	 
		 for(x=0; x< gApplication.cache.cache.userdata.profiles.length; x++){
			
			 if((beerProfile.hoppy == parseInt(gApplication.cache.cache.userdata.profiles[x].bitterness)) &&
				  (beerProfile.boozy == parseInt(gApplication.cache.cache.userdata.profiles[x].alcohol)) &&
				  (beerProfile.complex == parseInt(gApplication.cache.cache.userdata.profiles[x].complexity))
			 ){
				 var profileMatchID = gApplication.cache.cache.userdata.profiles[x].id;
				 var profileMatchName = gApplication.cache.cache.userdata.profiles[x].name;
			 }
		 }
		 
		 if(profileMatchID){
		 	 console.log( 'match: '+ profileMatchID );
		 	
			 var params = new Object();
					 params.profile = profileMatchName;
			 gApplication.refreshView('profile', params);
		 }
		 else {
			 console.log('no matching profiles');
			 
			 var params = new Object();
					 params.profile = '';
			 gApplication.refreshView('profile', params);
		 }
	
	 }
	
	 // Cache this for efficiency
	 el = $(this);
	 
	 // Measure width of range input
	 width = el.width();
	 //console.log(width);
	 
	 // Figure out placement percentage between left and right of input
	 newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
	 newPoint = newPoint.toFixed(1);
	 //console.log(newPoint);
	  
	 offset = 0;
	
	 // Prevent bubble from going beyond left or right (unsupported browsers)
	 if (newPoint <= 0) { 
	 	 offset = 2; 
	 }
	 else if (newPoint >= 1) {
	 	 offset = -39; 
	 }
	 else {
	 	 offset = -((newPoint * 100) * 38) / 100; 
	 	 //newPlace = width * newPoint + offset;  
	 }
	 
	 if(section != undefined){
	 
	 	 var value = el.val();
	 	 
	 	 if(section.section == "hoppy"){
			 beerProfile.hoppy = parseInt(value);
			 var curVal = beerProfile.hoppy;
			 
			 $('.tab.hoppyness .filter-value').text(curVal);
		 }
		 if(section.section == "boozy"){
		 	 beerProfile.boozy = parseInt(value);
		 	 var curVal = beerProfile.boozy;
		 	 
		 	 $('.tab.alcohol .filter-value').text(curVal);
		 }
		 if(section.section == "complex"){
		 	 beerProfile.complex = parseInt(value);
		 	 var curVal = beerProfile.complex;
		 	 
		 	 $('.tab.complexity .filter-value').text(curVal);
		 }
	 }
	 else {
		 var curVal = el.val();
	 }
	 
	 console.log(curVal);
	 
	 if(curVal == 0){
		 curVal = 'All';
		 $('output[for="input-level"]').css({
		 	'font-size': '12px',
		 	'text-indent': '-2px'
		 });
	 }
	 else {
		 $('output[for="input-level"]').css({
		 	'font-size': '15px',
		 	'text-indent': '0px'
		 });
	 }
	 
	 //console.log(beerProfile);
	 
	 $('.progress-bar').css({
		 'width': (newPoint * 100) + "%"
	 });
	 
	 // Move bubble
	 el
	   .next("output")
	   .css({
	     left: (newPoint * 100) + "%",
	     marginLeft: Math.round(offset + 1)
	   })
	     .text( curVal );
	     
	     // Get matches
		   Application.prototype.findMatches.call(this);
	 })
	 // Fake a change to position bubble at page load
	 .trigger('change');
 
};

ResultsView.prototype.toggleSlider = function (){

	var x = this.params.el;
	var section = this.params.section;
	
	if( $('.results .'+ x).hasClass('active') ){
		$('.results .'+ x).removeClass('active');
		gApplication.hideView('slider', 'p-transition-visible-quick');
	}
	else {
		$('.results .tab').removeClass('active');
		$('.results .'+ x).addClass('active');
		
		var params = new Object();
				params.section = section;
				
		gApplication.refreshView('slider', params, 'p-transition-visible-quick');
		this.getProfile();
	}

};

$(window).resize(function(){
	//ResultsView.prototype.rangeOutput.call(this);
});