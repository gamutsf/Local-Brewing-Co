var FilterTag = function ()
{
	positron.tag.Tag.call (this);
	
	this.requiredAttributes = new Array (1);
	this.requiredAttributes [0] = "beerskey";
};

positron.inherits (FilterTag, positron.tag.Tag);

FilterTag.prototype.process = function (inElement, inContext, inTreeWalker)
{
	console.log(gApplication);
	
	var beersKey = inElement.getAttribute ("beerskey");
	
	// Options
	var hoppyness = inElement.getAttribute ("hoppyness");
	var alcohol = inElement.getAttribute ("alcohol");
	var complexity = inElement.getAttribute ("complexity");	
	
	var beers = gApplication.getContextReference (beersKey, inContext);
	
	var matches = new Array ();
	var nonDuplicatedArray = [];
	var orderedList = [];
	var variability = 1;
	
	if (beers && Array.isArray (beers))
	{
		for(var x=0; x < beers.length; x++){
	
			matches.push( beers[x] );
	
		}
		
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
			var output = new Array ();
		 	var arrResult = {};
			for (i = 0, n = orderedList.length; i < n; i++) {
				 var item = orderedList[i];
				 arrResult[ item.name ] = item;
			}
			 
			i = 0;    
			for(var item in arrResult) {
			   output[i++] = arrResult[item];
			}
		}
		
	}
	else
	{
		console.error ("oi bitch no beers in context");
	}

	return this.walkChildren (inElement, inContext, inTreeWalker, matches);
}

/*
var	FilterTag = function ()
{
	positron.tag.Tag.call (this);

	this.requiredAttributes = new Array (1);
	this.requiredAttributes [0] = "cachekey";
};
positron.inherits (FilterTag, positron.tag.Tag);

FilterTag.prototype.process = function (inElement, inContext, inTreeWalker)
{
	// Get the feed url (or array value?)
	var	cachekey = positron.DOM.getAttributeValue (inElement, "cachekey");
	
	var newContext = gApplication.makeContext (inContext);

	var	output = this.output (cachekey);
	newContext.put (this.getName (inElement), output);

  return this.walkChildren (inElement, newContext, inTreeWalker);
}

FilterTag.prototype.output = function (cachekey)
{
	var	filtered = new Object ();	
	
	var matches = new Array ();
	
	var inData = gApplication.cache.cache.beerlist;
  
  for(var x=0; x < inData.beers.length; x++){
	
		if(inData.beers[x].style == "ale"){
			console.log('match: '+ inData.beers[x].name);
			
			matches.push(inData.beers[x]);
		}
		
	}
	
	filtered.beers = output; // output is the global matching array -- this should change
  
  console.log(filtered);
	
	return filtered;
}
*/