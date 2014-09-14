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
	
	var self = this;
	
	self.rangeOutput();
	
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
	   	 var style = beer.short_description;
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
	   	 
		   	 if( (beerProfile.hoppy >= (hoppyness - variability)) && 
		   	 		 (beerProfile.hoppy <= (hoppyness + variability)) 
		   	 ){
		   	 	 //console.log('hoppy secondary match: '+ name);
		   	 	 matches.push(beer);
		   	 }
		   	 
		   	 if( (beerProfile.boozy >= (alcohol - variability)) && 
		   	 		 (beerProfile.boozy <= (alcohol + variability)) 
		   	 ){
		   	 	 //console.log('alcohol secondary match: '+ name);
		   	 	 matches.push(beer);
		   	 }
		   	 
		   	 if( (beerProfile.complex >= (complexity - variability)) && 
		   	 		 (beerProfile.complex <= (complexity + variability)) 
		   	 ){
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
		 
		 
		 // Begin filter sequence
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
			   	.append('<div class="beer-sum '+ output[y].style +' noclick">'+
										'<div class="info">'+
											'<h2 class="name">'+ output[y].name +'</h2>'+
											'<div class="description">'+ output[y].short_description +'</div>'+
										'</div>'+
										'<div class="levels">'+
											'<div class="icon-hoppy"><div class="hoppy-level level">'+ output[y].hoppyness +'</div></div>'+
											'<div class="icon-boozy"><div class="boozy-level level">'+ output[y].alcohol +'</div></div>'+
											'<div class="icon-complex"><div class="complex-level level">'+ output[y].complexity +'</div></div>'+
										'</div>'+
									'</div>');
								
				}
				
				$('.num-results').empty().prepend(output.length +' matches');
				
				setTimeout(function(){
					$('.beer-sum').removeClass('noclick');
				}, 400);
					
				$('.beer-sum').click(function(){
				 var name = $('.name', this).text();
				 var hoppyness = $('.hoppy-level', this).text();
				 var alcohol = $('.boozy-level', this).text();
				 var complexity = $('.complex-level', this).text();
				 
				 var params = new Object();
				 		 params.name = name;
				 		 params.hoppyness = hoppyness;
				 		 params.alcohol = alcohol;
				 		 params.complexity = complexity;
				 
				 gApplication.refreshView('single', params, 'nu-slide-in-from-right');
				 //gApplication.hideView('results');
				 
			 });
		 }
	   
	 });
	 
};

ResultsView.prototype.toggleSlider = function (){

	//console.log(this.params);
	
	var x = this.params.el;
	var section = this.params.section;

	if( $('.'+ x).hasClass('active') ){
		$('.'+ x).removeClass('active');
		gApplication.hideView('slider', 'pos-transition-visible-quick');
	}
	else {
		$('.tab').removeClass('active');
		$('.'+ x).addClass('active');
		
		var params = new Object();
				params.section = section;
				
		gApplication.refreshView('slider', null, 'pos-transition-visible-quick');
		this.getProfile();
	}

};

$(window).resize(function(){
	ResultsView.prototype.rangeOutput.call(this);
});