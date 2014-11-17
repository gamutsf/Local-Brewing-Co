/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	MenuView = function ()
{
	//console.log ("MenuView()");
	
	positron.View.call (this);
};

positron.inherits (MenuView, positron.View);

MenuView.prototype.onDOMReady = function ()
{
	//console.log ("MenuView.onDOMReady()");
	
	// Prevent Menu from moving while open
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
		/*
		$('form').submit(function(e){
			e.preventDefault();
			var profileName = $('input', this).val();
			alert('Added profile: '+ profileName);
			
			var params = new Object();
					params.profile = profileName;
			gApplication.refreshView('profile', params);
			gApplication.hideView('Menu');
		});
		*/
	}
	
	if(params.section == "account"){
		/*
		setTimeout(function(){
			gApplication.refreshView('profiles');
			gApplication.refreshView('favorites');
		}, 501);	
		*/
	}
	
}

MenuView.prototype.loadProfile = function ()
{

	var profileID = this.params.id;
	console.log(profileID);
	
	console.log(gApplication);
	
	if(gApplication.cache.cache.userdata.profiles){
	
		for(x=0; x< gApplication.cache.cache.userdata.profiles.length; x++){
			
			if( parseInt(gApplication.cache.cache.userdata.profiles[x].id) == parseInt(profileID) ){
			
				beerProfile.hoppy = parseInt(gApplication.cache.cache.userdata.profiles[x].bitterness);
				beerProfile.boozy = parseInt(gApplication.cache.cache.userdata.profiles[x].alcohol);
				beerProfile.complex = parseInt(gApplication.cache.cache.userdata.profiles[x].complexity);
				
				this.updateProfile(gApplication.cache.cache.userdata.profiles[x].name);
			}
		}
	
	}

}

MenuView.prototype.updateProfile = function (name)
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

MenuView.prototype.addProfile = function (e)
{
	e.preventDefault();
	
	var name = $('form input[name="profile_name"]').val();
	console.log(name);
	
	/*
	$('.hoppyness .filter-value').html(beerProfile.hoppy);
		$('.alcohol .filter-value').html(beerProfile.boozy);
		$('.complexity .filter-value').html(beerProfile.complex);

		
		// Need server-side save call here
		$('form').submit(function(e){
			e.preventDefault();
			var profileName = $('input', this).val();
			alert('Added profile: '+ profileName);
			
			
		});
		*/
		
	var params = new Object();
			params.profile = name;
	gApplication.refreshView('profile', params);
	gApplication.hideView('menu');
	
	
	// Actually save it...
	
	$.ajax({
  	url: "http://localbrewingco.com/cms/wp-admin/admin-ajax.php",
  	data: {
	    action: 'ajaxAddProfile',
	    profile_name: name,
	    author_id: localStorage.lbc_user,
	    bitterness: beerProfile.hoppy,
	    alcohol: beerProfile.boozy,
	    complexity: beerProfile.complex
		},
		dataType: "jsonp",
		async: true,
		success: function (inData, inTextStatus, inXHR)
		{
      console.log(inData);
      
      Application.prototype.refreshUserdata.call(this);
		},
		error: function (inXHR, inTextStatus, inThing)
		{
			console.log(inXHR + inTextStatus + inThing);
		}
  });

}

MenuView.prototype.removeProfile = function ()
{
	
	var id = this.params.id;
	var name = this.params.name;
	
	/*
	var params = new Object();
		  params.profile = '';
  gApplication.refreshView('profile', params);	
	*/
	
	if (confirm('Are you sure you want to remove this profile?')) {
		
    // Remove it!
    console.log('removing profile: '+ name + ' ('+ id +')');
    $('.beer-profiles li[data-id="'+ id +'"]').addClass('nu-slide-out-to-left');
    
    $('.beer-profiles li[data-id="'+ id +'"]').one('webkitAnimationEnd', function() {
			$(this).remove();
		});
		
		$.ajax({
	  	url: "http://localbrewingco.com/cms/wp-admin/admin-ajax.php",
	  	data: {
		    action: 'ajaxRemoveProfile',
		    profile_id: id,
			},
			dataType: "jsonp",
			async: true,
			success: function (inData, inTextStatus, inXHR)
			{
	      //console.log(inData);
	      
	      Application.prototype.refreshUserdata.call(this);
			},
			error: function (inXHR, inTextStatus, inThing)
			{
				console.log(inXHR + inTextStatus + inThing);
			}
	  });
		
	} else {
		
    // Do nothing!
    console.log('cancelling removal');
    
	}
		
}

MenuView.prototype.removeFavorite = function (e)
{
	e.preventDefault();
	
	var id = this.params.id;
	var name = this.params.name;
	
	if (confirm('Are you sure you want to remove this favorite?')) {
		
    // Save it!
    console.log('removing favorite: '+ name + ' ('+ id +')');
    
    $('.favorite-beers li[data-id="'+ id +'"]').addClass('nu-slide-out-to-left');
    
    $('.favorite-beers li[data-id="'+ id +'"]').one('webkitAnimationEnd', function() {
			$(this).remove();
		});
		
		$.ajax({
	  	url: "http://localbrewingco.com/cms/wp-admin/admin-ajax.php",
	  	data: {
		    action: 'removeFavorite',
		    beer_id: id,
		    user_id: localStorage.lbc_user
			},
			dataType: "jsonp",
			async: true,
			success: function (inData, inTextStatus, inXHR)
			{
	      //console.log(inData.status + ': '+ name);
	      //alert(name + ' has been removed from your favorites!');
	      
	      Application.prototype.refreshUserdata.call(this);
			},
			error: function (inXHR, inTextStatus, inThing)
			{
				console.log(inXHR + inTextStatus + inThing);
			}
	  });
	  
	} else {
		
    // Do nothing!
    console.log('cancelling removal');
	    
	}
		
}

MenuView.prototype.close = function ()
{
	// Prevent Menu from moving while open
	document.querySelector('.results').removeEventListener('touchmove', preventDefault, false);
}

MenuView.prototype.logout = function ()
{
	// Remove LS Keys
	localStorage.lbc_user = 0;
	localStorage.removeItem('lbc_user');
	
	$.ajax({
  	url: "http://localbrewingco.com/cms/wp-admin/admin-ajax.php",
  	data: {
	    action: 'ajaxLogout'
		},
		dataType: "jsonp",
		async: true,
		success: function (inData, inTextStatus, inXHR)
		{
      //console.log(inData.status + ': '+ name);
      //alert(name + ' has been removed from your favorites!');
      
      Application.prototype.clearUserdata.call(this);
      
      // Go to homepage
      location.href = './';
		},
		error: function (inXHR, inTextStatus, inThing)
		{
			console.log(inXHR + inTextStatus + inThing);
		}
  });
}