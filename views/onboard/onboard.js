var	OnboardView = function ()
{
	console.log ("OnboardView()");
	
	positron.View.call (this);
};
positron.inherits (OnboardView, positron.View);

OnboardView.prototype.onDOMReady = function ()
{
	console.log ("OnboardView.onDOMReady()");
	
	var horzScroll;
	var winWidth = $(window).width();
	$('.onboard #scroller').css('width', (winWidth * 3) +'px');
	
	horzScroll = new iScroll(document.querySelector('.onboard #wrapper'), {
		snap: true,
		momentum: false,
		vScroll: false,
		hScrollbar: false,
		vScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#indicator > div.active').className = '';
			document.querySelector('#indicator > div:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}
	});
}