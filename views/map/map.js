/**
*
* @license
* Copyright © 2013 Jason Proctor.  All rights reserved.
*
**/

var	MapView = function ()
{
	//console.log ("OverlayView()");
	
	positron.View.call (this);
};

positron.inherits (MapView, positron.View);

MapView.prototype.onDOMReady = function ()
{
	console.log ("MapView.onDOMReady()");
	
	// Map
	/*
  var map, marker, mapEl, draggable;

	mapEl = document.getElementById('map');	
  
  var markerPos = new google.maps.LatLng(37.776490, -122.397160);
	
	var mapOptions = {
    zoom: 14,
    center: markerPos,
    scrollwheel: false,
    mapTypeControl: false,
		panControl: false,
		zoomControl: false,
		streetViewControl: false,
		draggable: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.TOP_LEFT
		},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  
  map = new google.maps.Map(mapEl, mapOptions);
  
  google.maps.event.addListenerOnce(map, 'idle', function(){
  	//mapsLoaded = true;  	
	});
  
  google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(markerPos);
	});
  
  var marker = new google.maps.Marker({
      position: markerPos,
      map: map,
      visible: true
  });
  */
  
  /****************/
  /****************/

  var map, lbc;
  var geocoder, markers;
	var markersArray = [];
	var latlng = [];
	var infos = [];
	var available = [];
	var order = 1;
	var globals = new Object();
			globals.zip = "";
			globals.account = "On Tap";
			globals.region = "";
			globals.beername = "";
  
  function initialize() {
  	geocoder = new google.maps.Geocoder();
  	lbc = new google.maps.LatLng(37.776490,-122.397160);	
    var myOptions = {
	    zoom: 14,
	    center: lbc,
	    scrollwheel: false,
	    mapTypeControl: false,
			panControl: false,
			zoomControl: false,
			streetViewControl: false,
			draggable: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.TOP_LEFT
			},
	    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"),myOptions);
    
    google.maps.event.addDomListener(window, 'resize', function() {
	   	map.setCenter(lbc); 
	  });
	  
	  map.setCenter(lbc);
    
    var lbc_icon = 'images/map_icon.png';
		var localMarker = new google.maps.Marker({
		    position: lbc,
		    map: map,
		    title:"Local Brewing Co.",
		    visible: true
		    //icon: lbc_icon
		});         
  }

  
  // Sets the map on all markers in the array.
	function setAllMap(map) {
	  for (var i = 0; i < markersArray.length; i++) {
	    markersArray[i].setMap(map);
	  }
	}
	
	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
	  setAllMap(null);
	}
	
	// Shows any markers currently in the array.
	function showMarkers() {
	  setAllMap(map);
	}
	
	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
	  clearMarkers();
	  markersArray = [];
	}
  
  function closeInfos(){
		if(infos.length > 0){
			infos[0].set("marker",null);
			infos[0].close();
			infos.length = 0;
		}
  }
  
  function getCurrentLocation(){
	  if (navigator.geolocation && navigator.geolocation.watchPosition)
		{
			console.log ("watching for position changes");
			
			navigator.geolocation.watchPosition
			(
				function (inPosition)
				{
					var latitude = inPosition.coords.latitude;
					var longitude = inPosition.coords.longitude;

					console.log ("watchPosition() returned location "
						+ latitude + "," + longitude);
					
					var currentLocation = new google.maps.LatLng(latitude,longitude);	
					map.setCenter(currentLocation);
					
					geocoder.geocode( { 'latLng': currentLocation}, function(results, status) {
			      if (status == google.maps.GeocoderStatus.OK) {
			      	
			      	if (results[0]) {
                  for(var i=0; i<results[0].address_components.length; i++)
                  {
                      var postalCode = results[0].address_components[i].types;
                      if(postalCode == "postal_code"){
	                      code = i;
	                      globals.zip = results[0].address_components[code].short_name;
	                      findZip(results[0].address_components[code].short_name);
                      }
                   }
               }
			        
			      } else {
			        //alert('Geocode was not successful for the following reason: ' + status);
			      }
			    });
					
				},
				function (inError)
				{
					console.error ("watchPosition() returns error:");
					console.error (inError.code + ": " + inError.message);
				},
				{
					enableHighAccuracy: true
				}
			);
		}
		else
		{
			console.error ("navigator.geolocation.watchPosition() not defined, no location services");
		}
  }

  
  function findZip(address) {
	  order = 1;  	
  	deleteMarkers();
  	
  	geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      	var region = results[0].address_components[2].long_name;
      	console.log(region);
      	
        map.setCenter(results[0].geometry.location);
        map.setZoom(12);
	    	
				$.ajax({
					url: 'http://localbrewingco.com/cms/json',
					data: 'type=locations&account='+ globals.account +'&zip='+ globals.zip +'&beername='+ globals.beername,
				  dataType: 'jsonp',
				  success: function(data) {
					  console.log(data.locations);
				  	
				  	var locations = data.locations;
				  	
				  	$('#beer-map .tap-list .list').empty();
				  	
				  	$('.map-result span').html(globals.zip);
					  $('.map-result').removeClass('pos-invisible');
					  
					  order = 1;
					  
					  for(var a=0; a < locations.length; a++){
						  plotPoints(locations[a], globals.beername);
					  }
				  }
				});
        
      } else {
        //alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  
  
  function findBeer() {
	  order = 1;  	
  	deleteMarkers();
  	
  	$.ajax({
			url: 'http://localbrewingco.com/cms/json',
			data: 'type=locations&account='+ globals.account +'&zip='+ globals.zip +'&beername='+ globals.beername,
		  dataType: 'jsonp',
		  success: function(data) {
			  console.log(data.locations);
		  	
		  	var locations = data.locations;
		  	
		  	$('#beer-map .tap-list .list').empty();
		  	
		  	$('.map-result span').html(globals.beername);
			  $('.map-result').removeClass('pos-invisible');
			  
			  order = 1;
			  
			  for(var a=0; a < locations.length; a++){
				  plotPoints(locations[a], globals.beername);
			  }
		  }
		});
  }
  
  
  function getAllLocations(){
	  order = 1;
  	deleteMarkers();
  	
    $.ajax({
		  url: 'http://localbrewingco.com/cms/json',
		  data: 'type=locations&account='+ globals.account +'&zip='+ globals.zip +'&beername='+ globals.beername,
		  dataType: 'jsonp',
		  success: function(data) {
			  console.log(data.locations);
			  
			  var locations = data.locations;
			  
			  $('#beer-map .tap-list .list').empty();
			  
			  $('.map-result span').html('All Locations');
			  $('.map-result').removeClass('pos-invisible');
			  
			  order = 1;
			  
			  for(var a=0; a < locations.length; a++){
				  plotPoints(locations[a]);
			  }
			
		  }
		});
		
		$('#shelf .center .btn.left').trigger('click');
  }

  
  function plotPoints(location, x){
	  
	  console.log(location);
	  
	  var lat = location.lat;
		var lng = location.lng;
		var name = location.name;
		var address = location.address;
		var city = location.city;
		var state = location.state;
		var zip = location.zip;
		var phone = location.phone;
		var website = location.website;
		
		var availability = location.availability;
		
		var ontap_list = [];
		
		// On Tap
		if(globals.account == "On Tap"){
			var ontap = location.ontap;		
			for(var b=0; b < ontap.length; b++){
				console.log(ontap[b]);
				if(ontap_list.indexOf(ontap[b].name) == -1){
					ontap_list.push(ontap[b].name);
				}
			}
		}		
		
		// Retail
		else if(globals.account == "Retail"){
			var retail = location.retail;
			for(var b=0; b < retail.length; b++){
				console.log(retail[b]);
				if(ontap_list.indexOf(retail[b].name) == -1){
					ontap_list.push(retail[b].name);
				}
			}
		}	
		
		// Both
		else {
			var ontap = location.ontap;		
			for(var b=0; b < ontap.length; b++){
				console.log(ontap[b]);
				if(ontap_list.indexOf(ontap[b].name) == -1){
					ontap_list.push(ontap[b].name);
				}
			}
			var retail = location.retail;
			for(var b=0; b < retail.length; b++){
				console.log(retail[b]);
				if(ontap_list.indexOf(retail[b].name) == -1){
					ontap_list.push(retail[b].name);
				}
			}
		}
		
		if(ontap_list.length > 0){
			 var taplist = ontap_list.join("</span>, <span class=\"beer\">");
		}
		else {
			 var taplist = '';
		}
		
		console.log(ontap_list);
  	
  	var template = '<div class="beer-sum" data-order="'+ order +'">'+
  										'<div class="order">'+ order +'</div>'+
											'<div class="info">'+
												'<h2 class="name">'+ name +'</h2>'+
												'<div class="description">'+ taplist +'</div>'+
											'</div>'+
										'</div>';
  	
  	$('#beer-map .tap-list .list').append(template);
  	
		
  	var contentString = '<div id="content">'+
		    '<div id="siteNotice">'+
		    '</div>'+
		    '<h2 style="font-size:16px;">'+ name +'</h2>'+
		    '<div id="bodyContent">'+
		    	'<p style="font-size:12px;">'+ address +'<br>'+ city +', '+ state +' '+ zip +'<br><a href="'+ website +'" target="_blank">'+ website +'</a></p>'+
		    	//'<p style="font-size:12px; font-weight:600;">Available here:<br/>'+
		    	//'<span style="font-weight:400;">'+ details +'</span></p>'+
		    '</div>'+
		    '</div>';
		
		var infowindow = new google.maps.InfoWindow({
		    content: contentString
		});

    	
    var markerpos = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        map: map,
        position: markerpos,
        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+ order +'|000000|FFFFFF'
    });
    
    latlng.push(markerpos);
    markersArray.push(marker);
    
    order++;
    
    setAllMap(map); 
		
    
    google.maps.event.addListener(marker, 'click', function() {          
	    if (!infowindow.getMap()) {
        infowindow.open(map, marker);
      } else {
        infowindow.close();
      };
      
      closeInfos();  
      infos[0]=infowindow;
    });
    
    if(x && (x != "")){
	    $('#beer-map .tap-list .list .beer-sum .description span').removeClass('active');
	    $('#beer-map .tap-list .list .beer-sum .description span').each(function(){
		    if( $(this).html().toLowerCase() == x.toLowerCase() ){
			    $(this).addClass('active');
		    }
	    });
    }
	  
	  /*
  	$('.group').each(function(){
  		var location_icon;
  		
    	var address = $('.map-link', this).attr('href').split('=')[1];
    	var account_type = $(this).data('account');
    	//var lat = $(this).data('lat');
    	//var lon = $(this).data('lon');
    	
    	var title = $('h4', this).html();
    	var address = $('p:eq(0)', this).html();
    	var details = $('#details', this).html();
    	
    	if(account_type == "On Tap" || "Both"){
	    	location_icon = 'http://wildcardbrewingco.com/images/map_icon_jack.png';
    	}
    	if(account_type == "Bottles"){
	    	location_icon = 'http://wildcardbrewingco.com/images/map-bottle.png';
    	}
    	
    	var contentString = '<div id="content">'+
			    '<div id="siteNotice">'+
			    '</div>'+
			    '<h2 style="font-size:16px;">'+ title +'</h2>'+
			    '<div id="bodyContent">'+
			    	'<p style="font-size:12px;">'+ address +'</p>'+
			    	'<p style="font-size:12px; font-weight:600;">Available here:<br/>'+
			    	'<span style="font-weight:400;">'+ details +'</span></p>'+
			    '</div>'+
			    '</div>';
			
			var infowindow = new google.maps.InfoWindow({
			    content: contentString
			});
	    	
      var markerpos = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({
          map: map,
          position: markerpos,
          icon: location_icon
      });
      
      latlng.push(markerpos);
      markersArray.push(marker);
      
      function closeInfos(){
				if(infos.length > 0){
					infos[0].set("marker",null);
					infos[0].close();
					infos.length = 0;
				}
      }
      
      google.maps.event.addListener(marker, 'click', function() {          
		    if (!infowindow.getMap()) {
          infowindow.open(map,marker);
        } else {
          infowindow.close();
        };
        closeInfos();  
        infos[0]=infowindow;
	    });

  	});
  	*/
  	    	
  }
  
  /*$('.map_sorting .ontap').click(function(){
  	$('.map_sorting h4').removeClass('on');
  	$(this).addClass('on');
  	
  	clearOverlays();
  	
  	var zip = $('#address').val();
  	
		$.ajax({
		  url: 'http://goldenroad.la/beer/find/',
		  data: 'account=on-tap&zip='+ zip,
		  dataType: 'html',
		  success: function(data) {
		  	if(data == ""){
			  	$('#search_results').html('<div class="group clearfix"><p>No locations nearby. Ask for us!</p></div>');
		  	} else {
		    	$('#search_results').html(data);
		    	plotPoints('On Tap');
		    }
		  }
		});
				    
  });
  
  $('.map_sorting .cans').click(function(){
  	$('.map_sorting h4').removeClass('on');
  	$(this).addClass('on');
  	
  	clearOverlays();
  	
  	var zip = $('#address').val();
  	
		$.ajax({
		  url: 'http://wildcardbrewingco.com/find/',
		  data: 'account=cans&zip='+ zip,
		  dataType: 'html',
		  success: function(data) {
		  	if(data == ""){
			  	$('#search_results').html('<div class="group clearfix"><p>No locations nearby. Ask for us!</p></div>');
		  	} else {
		    	$('#search_results').html(data);
		    	plotPoints('Cans');
		    }
		  }
		});
				    
  });
  
  $('.map_sorting .both').click(function(){
  	$('.map_sorting h4').removeClass('on');
  	$(this).addClass('on');
  	
  	clearOverlays();
  	
  	var zip = $('#address').val();
	    	
		$.ajax({
		  url: 'http://goldenroad.la/beer/find/',
		  data: 'zip='+ zip,
		  dataType: 'html',
		  success: function(data) {
		  	if(data == ""){
			  	$('#search_results').html('<div class="group clearfix"><p>No locations nearby. Ask for us!</p></div>');
		  	} else {
		    	$('#search_results').html(data);
		    	plotPoints();
		    }
		  }
		});
				    
  });*/

  
  $(document).on('click touchend', '.beer-sum', function(){
		 var markerID = $(this).data('order');
		 var marker = markersArray[markerID - 1];
	   var markerlatLng = marker.getPosition();
		 map.setCenter(markerlatLng);
		 map.panBy(0,-50);
		 google.maps.event.trigger(markersArray[markerID - 1], "click");
	});
	
	
	$('#shelf .center .btn').on('click touchend', function(){
  	$('#shelf .center .btn').removeClass('active');
  	$(this).addClass('active');
  	
  	if( $(this).html().toLowerCase() == "all" ){
	  	globals.account = "";
  	}
  	else {
  		globals.account = $(this).html();
  	}
  	
  	order = 1;  	
  	deleteMarkers();
  	
  	$.ajax({
		  url: 'http://localbrewingco.com/cms/json',
		  data: 'type=locations&account='+ globals.account +'&zip='+ globals.zip +'&beername='+ globals.beername,
		  dataType: 'jsonp',
		  success: function(data) {
		  	
		  	console.log(data.locations);
		  	
		  	var locations = data.locations;
		  	
		  	$('#beer-map .tap-list .list').empty();
		  	
		  	$('.map-result').removeClass('pos-invisible');
			  
			  order = 1;
			  
			  for(var a=0; a < locations.length; a++){
				  plotPoints(locations[a], globals.beername);
			  }
		  }
		});	    
  });
  
  
  $('.icon-search').on('click', function(){
	  $('form input').focus();
	});
	
	$('#shelf .zip').on('click', function(){
		getCurrentLocation();
	});
  
  
  $('form').submit(function(e){
	  e.preventDefault();
	  
	  this.hidekeyboard();
	  
	  deleteMarkers();
	  
	  var val = $('input', this).val();
	  console.log(val);
	  
	  //$('.map-result span').html('...');
	  
	  if((val.length == 5) && !isNaN(val)){
		  globals.zip = val;
		  findZip(globals.zip);
	  }
	  else {
		  /*
		  globals.beername = val;
		  findBeer(globals.beername);
		  */
		  if(globals.zip != ""){
			  findZip(globals.zip);
		  }
	  }
	  
	  $('.search-close').addClass('pos-invisible');
	  $('.search').removeClass('active');
	  $('input', this).val('');
  });
  
  initialize();
  getAllLocations();
  //getCurrentLocation();
}

MapView.prototype.hidekeyboard = function ()
{
	document.activeElement.blur();
  $("input").blur();
}