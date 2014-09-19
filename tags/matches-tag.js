var MatchesTag = function ()
{
	positron.tag.Tag.call (this);
	
	this.requiredAttributes = new Array (1);
	this.requiredAttributes [0] = "beerskey";
};

positron.inherits (MatchesTag, positron.tag.Tag);

MatchesTag.prototype.process = function (inElement, inContext, inTreeWalker)
{
	console.log(gApplication);
	
	var beersKey = inElement.getAttribute ("beerskey");
	var beers = gApplication.getContextReference (beersKey, inContext);
	
	var matches = new Array ();
	
	if (beers && Array.isArray (beers))
	{
		for(var x=0; x < beers.length; x++){
	
			if(beers[x].style == "ale"){
				console.log('match: '+ beers[x].name);
	
				matches.push( beers[x] );
			}
		}
		
		console.log(matches);
	}
	else
	{
		console.error ("oi bitch no beers in context");
	}

	return this.walkChildren (inElement, inContext, inTreeWalker, matches);
}

/*
var	MatchesTag = function ()
{
	positron.tag.Tag.call (this);

	this.requiredAttributes = new Array (1);
	this.requiredAttributes [0] = "cachekey";
};
positron.inherits (MatchesTag, positron.tag.Tag);

MatchesTag.prototype.process = function (inElement, inContext, inTreeWalker)
{
	// Get the feed url (or array value?)
	var	cachekey = positron.DOM.getAttributeValue (inElement, "cachekey");
	
	var newContext = gApplication.makeContext (inContext);

	var	output = this.output (cachekey);
	newContext.put (this.getName (inElement), output);

  return this.walkChildren (inElement, newContext, inTreeWalker);
}

MatchesTag.prototype.output = function (cachekey)
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