<?php
	include('header.php');
?>

	<header p-view="header" class="p-visible" p-view-params="title: Beer Map;"></header>
	
	
	<div p-view="map:cj" id="beer-map">
		<div id="map-container">
			<div id="map"></div>
		</div>	
		
		<div id="results">
			
			<div id="shelf">
				<div class="left search">
					<form action="#">
						<span 
							class="icon-search"
							p-action-1="(tap) addclass: active/.search"
							p-action-2="(tap) removeclass: p-invisible/.search-close"
							p-action-3="(tap) addclass: noscroll/.sub-nav .nav"
						></span>
						<input type="text" placeholder="Enter Zip Code">
						<span 
							class="search-close p-invisible"
							p-action-1="(tap) addclass: p-invisible/p-this-element"
							p-action-2="(tap) removeclass: active/.search"
							p-action-3="(tap) removeclass: noscroll/.sub-nav .nav"
							p-action-4="(tap) call: hidekeyboard"
						>&times;</span>
					</form>
				</div>
				<div class="center buttons type">
					<div class="btn btn-left active">On Tap</div>
					<div class="btn btn-right">In Stores</div>
				</div>
				<div class="right zip">
					<span class="icon-target"></span>
				</div>
			</div>		
				
			<div class="tap-list">
				<div class="map-result p-invisible">Results for "<span></span>"</div>
				<div class="list"></div>
			</div>
		</div>
	</div>
	
	<!--
	<section p-view="taplist" class="tap-list p-visible"></section>
	<section p-view="single" class="single p-invisible"></section>
	-->

</body>
</html>