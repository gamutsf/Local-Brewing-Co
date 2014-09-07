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
	//console.log ("ResultsView.onDOMReady()");
	
	this.rangeOutput();
	
	/*
	function toggleSlider(x, section){
		if( $(x).hasClass('active') ){
			$(x).removeClass('active');
			gApplication.hideView('slider', 'pos-transition-visible-quick');
		}
		else {
			$('.tab').removeClass('active');
			$(x).addClass('active');
			
			var params = new Object();
					params.section = section;
			gApplication.showView('slider', null, 'pos-transition-visible-quick');
		}
	}
	
	$(document).on('click', '.hoppyness.tab', function(){
		toggleSlider(this, 'hoppy');
	});
	
	$(document).on('click', '.alcohol.tab', function(){
		toggleSlider(this, 'boozy');
	});
	
	$(document).on('click', '.complexity.tab', function(){
		toggleSlider(this, 'complex');
	});
	*/
	
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
	
	// Select all range inputs, watch for change
	$("input[type=range]").on('input change', function() {
	
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
	 	 offset = -29; 
	 }
	 else {
	 	 offset = -((newPoint * 100) * 28) / 100; 
	 	 //newPlace = width * newPoint + offset;  
	 }
	 
	 if(section != undefined){
	 
	 	 var value = el.val();
	 	 
	 	 if(section.section == "hoppy"){
			 beerProfile.hoppy = parseInt(value);
			 var curVal = beerProfile.hoppy;
		 }
		 if(section.section == "boozy"){
		 	 beerProfile.boozy = parseInt(value);
		 	 var curVal = beerProfile.boozy;
		 }
		 if(section.section == "complex"){
		 	 beerProfile.complex = parseInt(value);
		 	 var curVal = beerProfile.complex;
		 }
	 }
	 else {
		 var curVal = el.val();
	 }
	 
	 //console.log(beerProfile);
	 
	 // Move bubble
	 el
	   .next("output")
	   .css({
	     left: (newPoint * 100) + "%",
	     marginLeft: Math.round(offset + 1)
	   })
	     .text( curVal );
	     
	     // Get matches
		   ResultsView.prototype.findMatches.call(this);
	 })
	 // Fake a change to position bubble at page load
	 .trigger('change');
 
};

ResultsView.prototype.findMatches = function (){
	
	 var matches = [];
	 var nonDuplicatedArray = [];
	 var orderedList = [];
	 var variability = 1;

	 $.ajax({
	   url: "sampledata.json"
	 })
	 .done(function(inData) {
	 
	 	 if(document.location.href.indexOf('localhost') < 0){
	 	 	 var inData = $.parseJSON( inData );
	 	 }
	 
	 	 //console.log(inData);
	   
	   $('.output.list').empty();
	   
	   $.each(inData.beers, function(i, beer){
	   
	   	 var name = beer.name;
	   	 var style = beer.style;
	   	 var hoppyness = beer.hoppyness;
	   	 var alcohol = beer.alcohol;
	   	 var complexity = beer.complexity;
	   	 
	   	 // Logic here	 
	   	 // First, find matches
	   	 
	   	 if((beerProfile.hoppy == 0) && 
	   	 	 (beerProfile.boozy == 0) && 
	   	 	 (beerProfile.complex == 0)
	   	 	 ){
		   	 	 matches.push(beer);
	   	 }
	   	 else {
	   	 
		   	 if( (beerProfile.hoppy >= (hoppyness - variability)) && (beerProfile.hoppy <= (hoppyness + variability)) ){
		   	 	 //console.log('hoppy secondary match: '+ name);
		   	 	 matches.push(beer);
		   	 }
		   	 
		   	 if( (beerProfile.boozy >= (alcohol - variability)) && (beerProfile.boozy <= (alcohol + variability)) ){
		   	 	 //console.log('alcohol secondary match: '+ name);
		   	 	 matches.push(beer);
		   	 }
		   	 
		   	 if( (beerProfile.complex >= (complexity - variability)) && (beerProfile.complex <= (complexity + variability)) ){
		   	 	 //console.log('complexity secondary match: '+ name);
		   	 	 matches.push(beer);
		   	 }
	   	 
	   	 }
							
		 });
		 
		 //console.log(matches);
		 
		 
		 // Remove duplicate matches

   	 function removeDuplicates(arr){
	   	 var arrResult = {};
			 for (i = 0, n = arr.length; i < n; i++) {
				    var item = arr[i];
				    arrResult[ item.name ] = item;
			 }
			 
			 i = 0;    
			 for(var item in arrResult) {
			    nonDuplicatedArray[i++] = arrResult[item];
			 }
			 
			 //console.log(nonDuplicatedArray);
			 
			 // Print results 
			 
			 function getPrimaryMatches(){
				 for(x=0; x < nonDuplicatedArray.length; x++){
				 
				 	 if((beerProfile.hoppy == 0) && 
			   	 	 (beerProfile.boozy == 0) && 
			   	 	 (beerProfile.complex == 0)
			   	 ){
					   	 orderedList.push(nonDuplicatedArray[x]);
			   	 }
			   	 else {
				 
					 	 // primary matches
					 	 if((nonDuplicatedArray[x].hoppyness == beerProfile.hoppy) &&
					 	 	  (nonDuplicatedArray[x].alcohol == beerProfile.boozy) &&
					 	 	  (nonDuplicatedArray[x].complexity == beerProfile.complex)
					 	 ){
						 	 //console.log('3/3 match: '+ nonDuplicatedArray[x].name);
						 	 orderedList.push(nonDuplicatedArray[x]);
					 	 }
				 	 
				 	 }
										
				 }
				 
				 getSecondaryMatches();
			 }
			 
			 function getSecondaryMatches(){
			 	 for(x=0; x < nonDuplicatedArray.length; x++){

			 	 	 // secondary matches
					 if(((beerProfile.hoppy >= (parseInt(nonDuplicatedArray[x].hoppyness) - variability)) && 
					    (beerProfile.hoppy <= (parseInt(nonDuplicatedArray[x].hoppyness) + variability))) ||
					    ((beerProfile.boozy >= (parseInt(nonDuplicatedArray[x].alcohol) - variability)) && 
					    (beerProfile.boozy <= (parseInt(nonDuplicatedArray[x].alcohol) + variability))) &&
				 	 		(nonDuplicatedArray[x].complexity != beerProfile.complex)
				 	 ){
					 	 //console.log('2/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if(((beerProfile.hoppy >= (parseInt(nonDuplicatedArray[x].hoppyness) - variability)) && 
					    (beerProfile.hoppy <= (parseInt(nonDuplicatedArray[x].hoppyness) + variability))) ||
					    ((beerProfile.complex >= (parseInt(nonDuplicatedArray[x].complexity) - variability)) && 
					    (beerProfile.complex <= (parseInt(nonDuplicatedArray[x].complexity) + variability))) &&
				 	 	  (nonDuplicatedArray[x].alcohol != beerProfile.boozy)
				 	 ){
					 	 //console.log('2/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if(((beerProfile.boozy >= (parseInt(nonDuplicatedArray[x].alcohol) - variability)) && 
					    (beerProfile.boozy <= (parseInt(nonDuplicatedArray[x].alcohol) + variability))) ||
					    ((beerProfile.complex >= (parseInt(nonDuplicatedArray[x].complexity) - variability)) && 
					    (beerProfile.complex <= (parseInt(nonDuplicatedArray[x].complexity) + variability))) &&
				 	 		(nonDuplicatedArray[x].hoppyness != beerProfile.hoppy)
				 	 ){
					 	 //console.log('2/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
			 	 
			 	 }
			 	 
			 	 getTertiaryMatches();  
			 }
			 
			 
			 function getTertiaryMatches(){
			 	 for(x=0; x < nonDuplicatedArray.length; x++){

					 // tertiary matches
					 
				 	 if(((beerProfile.complex >= (parseInt(nonDuplicatedArray[x].complexity) - variability)) && 
					    (beerProfile.complex <= (parseInt(nonDuplicatedArray[x].complexity) + variability))) &&
				 	 		(nonDuplicatedArray[x].hoppyness != beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol != beerProfile.boozy)
				 	 ){
					 	 //console.log('1/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if(((beerProfile.hoppy >= (parseInt(nonDuplicatedArray[x].hoppyness) - variability)) && 
					    (beerProfile.hoppy <= (parseInt(nonDuplicatedArray[x].hoppyness) + variability))) &&
				 	 	  (nonDuplicatedArray[x].alcohol != beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity != beerProfile.complex)
				 	 ){
					 	 //console.log('1/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if(((beerProfile.boozy >= (parseInt(nonDuplicatedArray[x].alcohol) - variability)) && 
					    (beerProfile.boozy <= (parseInt(nonDuplicatedArray[x].alcohol) + variability))) &&
				 	 	  (nonDuplicatedArray[x].hoppyness != beerProfile.hoppy) &&
				 	 		(nonDuplicatedArray[x].complexity != beerProfile.complex)
				 	 ){
					 	 //console.log('1/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
			 	 
			 	 }
			 	 
			 	 printMatches();	 
			 } 
			 	 
			 getPrimaryMatches();
		 }
		 
		 removeDuplicates(matches);
		 
		 function printMatches(){
		 
		 	 //console.log(orderedList);
		 
		 	 var output = [];
		 	 var arrResult = {};
			 for (i = 0, n = orderedList.length; i < n; i++) {
				    var item = orderedList[i];
				    arrResult[ item.name ] = item;
			 }
			 
			 i = 0;    
			 for(var item in arrResult) {
			    output[i++] = arrResult[item];
			 }
		 
		 	 for(y=0; y < output.length; y++){
		 
				 $('.output.list')
			   	.append('<div class="beer-sum noclick">'+
										'<div class="info">'+
											'<h2 class="name">'+ output[y].name +'</h2>'+
											'<div class="description">'+ output[y].style +'</div>'+
										'</div>'+
										'<div class="levels">'+
											'<div class="hoppy-level level">'+ output[y].hoppyness +'</div>'+
											'<div class="boozy-level level">'+ output[y].alcohol +'</div>'+
											'<div class="complex-level level">'+ output[y].complexity +'</div>'+
										'</div>'+
									'</div>');
								
				}
				
				$('.output.list').prepend('<div class="num-results">'+ output.length +' matches</div>');
				
				setTimeout(function(){
					$('.beer-sum').removeClass('noclick');
				}, 400);
					
				$('.beer-sum').click(function(){
				 var name = $('.name', this).text();
				 
				 var params = new Object();
				 		 params.name = name;
				 
				 gApplication.refreshView('single', params, 'nu-slide-in-from-right');
				 gApplication.hideView('results');
				 
			 });
		 }
	   
	 });
	 
};

$(window).resize(function(){
	ResultsView.prototype.rangeOutput.call(this);
});