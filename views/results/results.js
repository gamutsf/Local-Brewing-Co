/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	ResultsView = function ()
{
	console.log ("ResultsView()");
	
	positron.View.call (this);
};

positron.inherits (ResultsView, positron.View);

ResultsView.prototype.onDOMReady = function ()
{
	console.log ("ResultsView.onDOMReady()");
	
	this.rangeOutput();
}

ResultsView.prototype.getProfile = function (){

	console.log(beerProfile);
	console.log(this.params);
	
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
	 
	 console.log(beerProfile);	 
	 console.log(section.section + ' value is: '+ curVal);
	 
	 el.val(curVal);	   
	 this.rangeOutput();
 
};

ResultsView.prototype.rangeOutput = function (){

	console.log(beerProfile);
	console.log(this.params);
	
	var el, newPoint, newPlace, offset;
	
	var section = this.params;
	
	// Select all range inputs, watch for change
	$("input[type=range]").on('input change', function() {
	
	 // Cache this for efficiency
	 el = $(this);
	 
	 // Measure width of range input
	 width = el.width();
	 console.log(width);
	 
	 // Figure out placement percentage between left and right of input
	 newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
	 newPoint = newPoint.toFixed(1);
	 console.log(newPoint);
	  
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
	 
	 console.log(beerProfile);
	 
	 if(section != undefined){	 
	 	 console.log(section.section + ' value is: '+ curVal);
	 }
	 
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
	
	 var matches;
	 var allMatches = [];
	 var primaryMatches = [];
	 var secondaryMatches = [];
	 var tertiaryMatches = [];
	 var nonDuplicatedArray = [];
	 var orderedList = [];

	 $.ajax({
	   url: "sampledata.json"
	 })
	 .done(function(inData) {
	   console.log('Found ' +inData.beers.length + ' records');
	   
	   $('.output.list').empty();
	   
	   $.each(inData.beers, function(i, beer){
	   
	   	 var name = beer.name;
	   	 var style = beer.style;
	   	 var hoppyness = beer.hoppyness;
	   	 var alcohol = beer.alcohol;
	   	 var complexity = beer.complexity;
	   	 
	   	 // Logic here	 
	   	 // First, find exact matches
	   	 
	   	 if( hoppyness == beerProfile.hoppy ){
	   	 	 //console.log('hoppy primary match: '+ name);
	   	 	 primaryMatches.push(beer);
	   	 }
	   	 
	   	 if( alcohol == beerProfile.boozy ){
	   	 	 //console.log('alcohol primary match: '+ name);
	   	 	 primaryMatches.push(beer);
	   	 }
	   	 
	   	 if( complexity == beerProfile.complex ){
	   	 	 //console.log('complexity primary match: '+ name);
	   	 	 primaryMatches.push(beer);
	   	 }
	   	 
	   	 // Second, check for close matches +/- variability
	   	 
	   	 var variability = 1;
	   	 
	   	 if( (beerProfile.hoppy >= (hoppyness - variability)) && (beerProfile.hoppy <= (hoppyness + variability)) ){
	   	 	 //console.log('hoppy secondary match: '+ name);
	   	 	 secondaryMatches.push(beer);
	   	 }
	   	 
	   	 if( (beerProfile.boozy >= (alcohol - variability)) && (beerProfile.boozy <= (alcohol + variability)) ){
	   	 	 //console.log('alcohol secondary match: '+ name);
	   	 	 secondaryMatches.push(beer);
	   	 }
	   	 
	   	 if( (beerProfile.complex >= (complexity - variability)) && (beerProfile.complex <= (complexity + variability)) ){
	   	 	 //console.log('complexity secondary match: '+ name);
	   	 	 secondaryMatches.push(beer);
	   	 }
							
		 });
		 
		 
		 // Finally, combine all matches
	   matches = allMatches.concat(primaryMatches, secondaryMatches);
		 
		 
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
		
			 getPrimaryMatches();
			 
			 function getPrimaryMatches(){
				 for(x=0; x < nonDuplicatedArray.length; x++){
				 
				 	 // primary matches
				 	 if((nonDuplicatedArray[x].hoppyness == beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol == beerProfile.boozy) &&
				 	 	  (nonDuplicatedArray[x].complexity == beerProfile.complex)
				 	 ){
					 	 console.log('3/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
										
				 }
				 
				 getSecondaryMatches();
			 }
			 
			 function getSecondaryMatches(){
			 	 for(x=0; x < nonDuplicatedArray.length; x++){
			 
					 // secondary matches
				 	 if((nonDuplicatedArray[x].hoppyness == beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol == beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity != beerProfile.complex)
				 	 ){
					 	 console.log('2/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if((nonDuplicatedArray[x].hoppyness == beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol != beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity == beerProfile.complex)
				 	 ){
					 	 console.log('2/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if((nonDuplicatedArray[x].hoppyness != beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol == beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity == beerProfile.complex)
				 	 ){
					 	 console.log('2/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
			 	 
			 	 }
			 	 
			 	 getTertiaryMatches();	 	  
			 }
			 
			 
			 function getTertiaryMatches(){
			 	 for(x=0; x < nonDuplicatedArray.length; x++){
			 
					 // tertiary matches
				 	 if((nonDuplicatedArray[x].hoppyness != beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol != beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity == beerProfile.complex)
				 	 ){
					 	 console.log('1/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if((nonDuplicatedArray[x].hoppyness == beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol != beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity != beerProfile.complex)
				 	 ){
					 	 console.log('1/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
				 	 
				 	 else 
				 	 if((nonDuplicatedArray[x].hoppyness != beerProfile.hoppy) &&
				 	 	  (nonDuplicatedArray[x].alcohol == beerProfile.boozy) &&
				 	 		(nonDuplicatedArray[x].complexity != beerProfile.complex)
				 	 ){
					 	 console.log('1/3 match: '+ nonDuplicatedArray[x].name);
					 	 orderedList.push(nonDuplicatedArray[x]);
				 	 }
			 	 
			 	 }
			 	 
			 	 printMatches();
			 }	 
			 
		 }
		 
		 function printMatches(){
		 
		 	 for(y=0; y < orderedList.length; y++){
		 
				 $('.output.list')
			   	.append('<div class="beer-sum">'+
										'<div class="info">'+
											'<h2 class="name">'+ orderedList[y].name +'</h2>'+
											'<div class="description">'+ orderedList[y].style +'</div>'+
										'</div>'+
										'<div class="levels">'+
											'<div class="hoppy-level level">'+ orderedList[y].hoppyness +'</div>'+
											'<div class="boozy-level level">'+ orderedList[y].alcohol +'</div>'+
											'<div class="complex-level level">'+ orderedList[y].complexity +'</div>'+
										'</div>'+
									'</div>');
								
				}
				
				$('.output.list').append('<div class="num-results">'+ orderedList.length +' matches</div>');
		 }
		 
		 removeDuplicates(matches);
		 
		 //console.log(matches);
	   
	 });
	 
};

$(window).resize(function(){
	ResultsView.prototype.rangeOutput.call(this);
});