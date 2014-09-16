positron.provide('Application');
positron.require('positron.Application');

var Application = function() {

	positron.Application.call(this);
	
	console.log('Application() called');
};

positron.inherits (Application, positron.Application);


Application.prototype.findMatches = function (){
	
	 var matches = [];
	 var nonDuplicatedArray = [];
	 var orderedList = [];
	 var variability = 1;

	 positron.Util.ajax({
	   url: "sampledata.json",
	   dataType: "json",
	   success: function(inData){
		   if(document.location.href.indexOf('localhost') < 0){
		 	 	 var inData = $.parseJSON( inData );
		 	 }
		 
		 	 //console.log(inData);
		   
		   $('.output.list').empty();
		   
		   var cacheKey = 'beerlist';
		   var cacheLifeTime = 15 * 60 * 1000;
		   gApplication.cache.put(cacheKey, inData, cacheLifeTime);
		   
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
	   }
	 });
	 
};