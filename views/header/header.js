/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	HeaderView = function ()
{
	//console.log ("OverlayView()");
	
	positron.View.call (this);
};

positron.inherits (HeaderView, positron.View);

HeaderView.prototype.onDOMReady = function ()
{
	console.log ("HeaderView.onDOMReady()");
}