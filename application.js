positron.provide('Application');
positron.require('positron.Application');

var Application = function() {

	positron.Application.call(this);
	
	console.log('Application() called');
};

positron.inherits (Application, positron.Application);


Application.prototype.findMatches = function (){

	 // jQuery.tap (for better clicks)
!function(a,b){"use strict";var c,d,e,f="._tap",g="._tapActive",h="tap",i="clientX clientY screenX screenY pageX pageY".split(" "),j={count:0,event:0},k=function(a,c){var d=c.originalEvent,e=b.Event(d);e.type=a;for(var f=0,g=i.length;g>f;f++)e[i[f]]=c[i[f]];return e},l=function(a){if(a.isTrigger)return!1;var c=j.event,d=Math.abs(a.pageX-c.pageX),e=Math.abs(a.pageY-c.pageY),f=Math.max(d,e);return a.timeStamp-c.timeStamp<b.tap.TIME_DELTA&&f<b.tap.POSITION_DELTA&&(!c.touches||1===j.count)&&o.isTracking},m=function(a){if(!e)return!1;var c=Math.abs(a.pageX-e.pageX),d=Math.abs(a.pageY-e.pageY),f=Math.max(c,d);return Math.abs(a.timeStamp-e.timeStamp)<750&&f<b.tap.POSITION_DELTA},n=function(a){if(0===a.type.indexOf("touch")){a.touches=a.originalEvent.changedTouches;for(var b=a.touches[0],c=0,d=i.length;d>c;c++)a[i[c]]=b[i[c]]}a.timeStamp=Date.now?Date.now():+new Date},o={isEnabled:!1,isTracking:!1,enable:function(){o.isEnabled||(o.isEnabled=!0,c=b(a.body).on("touchstart"+f,o.onStart).on("mousedown"+f,o.onStart).on("click"+f,o.onClick))},disable:function(){o.isEnabled&&(o.isEnabled=!1,c.off(f))},onStart:function(a){a.isTrigger||(n(a),(!b.tap.LEFT_BUTTON_ONLY||a.touches||1===a.which)&&(a.touches&&(j.count=a.touches.length),o.isTracking||(a.touches||!m(a))&&(o.isTracking=!0,j.event=a,a.touches?(e=a,c.on("touchend"+f+g,o.onEnd).on("touchcancel"+f+g,o.onCancel)):c.on("mouseup"+f+g,o.onEnd))))},onEnd:function(a){var c;a.isTrigger||(n(a),l(a)&&(c=k(h,a),d=c,b(j.event.target).trigger(c)),o.onCancel(a))},onCancel:function(a){a&&"touchcancel"===a.type&&a.preventDefault(),o.isTracking=!1,c.off(g)},onClick:function(a){return!a.isTrigger&&d&&d.isDefaultPrevented()&&d.target===a.target&&d.pageX===a.pageX&&d.pageY===a.pageY&&a.timeStamp-d.timeStamp<750?(d=null,!1):void 0}};b(a).ready(o.enable),b.tap={POSITION_DELTA:10,TIME_DELTA:400,LEFT_BUTTON_ONLY:!0}}(document,jQuery);
	
	 var matches = [];
	 var nonDuplicatedArray = [];
	 var orderedList = [];
	 var variability = 1;
	 
	 if(document.location.href.indexOf('localhost') < 0){
	 		var dataType = "jsonp";
	 }
	 else {
		  var dataType = "json";
	 }

	 positron.Util.ajax({
	   url: "http://localbrewingco.com/cms/json?type=beerlist&callback=",
	   dataType: dataType,
	   success: function(inData){
		   console.log(inData);
		   if(document.location.href.indexOf('localhost') < 0){
		 	 	 //var inData = $.parseJSON( inData );
		 	 }
		   
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
		   	 
		   	 matches.push(beer);
								
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
			 
			 	 output = [];
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
				   	.append('<div class="beer-sum '+ output[y].style +' noclick" ontouchend>'+
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
						
					$('.beer-sum').on('click', function(){
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
					 
					 $('.beer-sum').addClass('noclick');
					 
				 });
			 }
	   }
	 });
	 
};