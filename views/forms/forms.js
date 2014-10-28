/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	FormsView = function ()
{
	//console.log ("OverlayView()");
	
	positron.View.call (this);
};

positron.inherits (FormsView, positron.View);

FormsView.prototype.onDOMReady = function ()
{
	console.log ("FormsView.onDOMReady()");
}