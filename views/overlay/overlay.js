/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	OverlayView = function ()
{
	//console.log ("OverlayView()");
	
	positron.View.call (this);
};

positron.inherits (OverlayView, positron.View);

OverlayView.prototype.onDOMReady = function ()
{
	//console.log ("OverlayView.onDOMReady()");
	
	// Prevent overlay from moving while open
	document.querySelector('.overlay').addEventListener('touchmove', function (e) { 
		e.preventDefault(); 
	});
	
}