/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	TaplistView = function ()
{
	console.log ("TaplistView()");
	
	positron.View.call (this);
};
positron.inherits (TaplistView, positron.View);

TaplistView.prototype.onDOMReady = function ()
{
	console.log ("TaplistView.onDOMReady()");
}

