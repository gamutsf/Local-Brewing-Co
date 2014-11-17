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
	
	$('form#facebook').submit(function(e){
		e.preventDefault();
		
		$('.signin', this).addClass('p-invisible');
		$('.loading', this).removeClass('p-invisible');
		
		FormsView.prototype.getLoginStatus.call(this);
	});
}

FormsView.prototype.login = function (id, email, protocol)
{
	console.log ("FormsView.login()");
	console.log(protocol);
	
	if(!protocol){
		console.log(this.params);
		
		var userid = this.params.data.data.userid;
		var username = this.params.data.data.username;
		var useravatar = this.params.data.data.avatar;
			
		localStorage.setItem('lbc_user', userid);
		
		document.location.href = './curator.php';
	}
	else {
		
		$.ajax({
			type: 'GET',
			url: 'http://localbrewingco.com/cms/wp-admin/admin-ajax.php',
			data: {
			  action: 'ajaxLogin',
			  user_login: id,
        user_password: email,
        protocol: protocol
			},
			dataType: "jsonp",
			async: true,
			success: function (inData, inTextStatus, inXHR)
			{
	      console.log(inData);
				console.log(inData.status);
				
				if(inData.status == "success"){
				
					var userid = inData.data.userid;
					var username = inData.data.username;
					var useravatar = inData.data.avatar;
						
					localStorage.setItem('lbc_user', userid);
					
					$('.signin', this).removeClass('p-invisible');
					$('.loading', this).addClass('p-invisible');
					
					document.location.href = './curator.php';
				}
				else {
					
					$('.signin', this).removeClass('p-invisible');
					$('.loading', this).addClass('p-invisible');
					
				}
			},
			error: function (inXHR, inTextStatus, inThing)
			{
				console.log(inXHR + inTextStatus + inThing);
				
				$('.signin', this).removeClass('p-invisible');
				$('.loading', this).addClass('p-invisible');
			}
		});
		
	}

}

// This is for Facebook login shite
FormsView.prototype.getLoginStatus = function ()
{
	FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
    	console.log('logged in');
    
			// this part auto-logs in someone with facebook if theyve already said yes
    	FormsView.prototype.getUserCredentials.call(this, response);
    
    } else {	          	
    	
    	console.log('not logged in');
    	
    	FormsView.prototype.fblogin.call(this);

    }
  });
}

FormsView.prototype.getUserCredentials = function (response)
{
	FB.api('/me', function(response) {
		
		console.log(response);
  
		var FBid = response.id;
		var FBemail = response.email;
		
		FormsView.prototype.login.call(this, FBid, FBemail, 'fb');
  });
}

FormsView.prototype.fblogin = function ()
{
	FB.login(function(response) {
     //console.log(response.status);
     //if (response.session) {
     if(response.status == "connected"){
     	console.log('logged in');
     
     	FormsView.prototype.getUserCredentials.call(this, response);
     
     } else {
     	console.log('not logged in');
     }
   }, { scope: "email" });
}