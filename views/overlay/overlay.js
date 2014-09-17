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
	document.querySelector('.results').addEventListener('touchmove', function (e) { 
		preventDefault();
	});
	
	var params = this.params;
	
	if(params.section == "save-profile"){
		console.log( beerProfile );
		
		$('.hoppyness .filter-value').html(beerProfile.hoppy);
		$('.alcohol .filter-value').html(beerProfile.boozy);
		$('.complexity .filter-value').html(beerProfile.complex);
		
		// Need server-side save call here
		$('form').submit(function(e){
			e.preventDefault();
			var profileName = $('input', this).val();
			alert('Added profile: '+ profileName);
			
			var params = new Object();
					params.profile = profileName;
			gApplication.refreshView('profile', params);
			gApplication.hideView('overlay');
		});
	}
	
}

OverlayView.prototype.loadProfile = function ()
{

	var profileID = this.params.id;
	console.log(profileID);
	
	if(gApplication.cache.cache.userprofiles){
	
		for(x=0; x< gApplication.cache.cache.userprofiles.length; x++){
			
			if( parseInt(gApplication.cache.cache.userprofiles[x].id) == parseInt(profileID) ){
			
				beerProfile.hoppy = parseInt(gApplication.cache.cache.userprofiles[x].hoppyness);
				beerProfile.boozy = parseInt(gApplication.cache.cache.userprofiles[x].alcohol);
				beerProfile.complex = parseInt(gApplication.cache.cache.userprofiles[x].complexity);
				
				this.updateProfile(gApplication.cache.cache.userprofiles[x].name);
			}
		}
	
	}

}

OverlayView.prototype.updateProfile = function (name)
{

	$('.tab.hoppyness .filter-value').text(beerProfile.hoppy);
	$('.tab.alcohol .filter-value').text(beerProfile.boozy);
	$('.tab.complexity .filter-value').text(beerProfile.complex);
	
	//$("input[type=range]").trigger('change');
	
	Application.prototype.findMatches.call(this);
	
	var params = new Object();
			params.profile = name;
	gApplication.refreshView('profile', params);
		
}

OverlayView.prototype.removeProfile = function (e)
{
	e.preventDefault();
	
	if (confirm('Are you sure you want to remove this profile?')) {
	    // Save it!
	    console.log('removing profile: '+ this.params.name + ' ('+ this.params.id +')');
	    $('.beer-profiles li[data-id="'+ this.params.id +'"]').addClass('nu-slide-out-to-left');
	    
	    $('.beer-profiles li[data-id="'+ this.params.id +'"]').one('webkitAnimationEnd', function() {
				$(this).remove();
			});
	} else {
	    // Do nothing!
	    console.log('cancelling removal');
	}
		
}

OverlayView.prototype.removeFavorite = function (e)
{
	e.preventDefault();
	
	if (confirm('Are you sure you want to remove this favorite?')) {
	    // Save it!
	    console.log('removing favorite: '+ this.params.name + ' ('+ this.params.id +')');
	    
	    $('.favorite-beers li[data-id="'+ this.params.id +'"]').addClass('nu-slide-out-to-left');
	    
	    $('.favorite-beers li[data-id="'+ this.params.id +'"]').one('webkitAnimationEnd', function() {
				$(this).remove();
			});
	} else {
	    // Do nothing!
	    console.log('cancelling removal');
	}
		
}

OverlayView.prototype.close = function ()
{
	// Prevent overlay from moving while open
	document.querySelector('.results').removeEventListener('touchmove', preventDefault, false);
}