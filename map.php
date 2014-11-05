<?php
	include('header.php');
?>

	<header pos-view="header" class="pos-visible" pos-view-params="title: Beer Map;"></header>
	
	
	<div pos-view="map:cj" id="beer-map">
		<div id="map-container">
			<div id="map"></div>
		</div>	
		
		<div id="results">
			
			<div id="shelf">
				<div class="left search">
					<form action="#">
						<span 
							class="icon-search"
							pos-action-1="(tap) addclass: active/.search"
							pos-action-2="(tap) removeclass: pos-invisible/.search-close"
							pos-action-3="(tap) addclass: noscroll/.sub-nav .nav"
						></span>
						<input type="text" placeholder="Enter Zip Code">
						<span 
							class="search-close pos-invisible"
							pos-action-1="(tap) addclass: pos-invisible/this-element"
							pos-action-2="(tap) removeclass: active/.search"
							pos-action-3="(tap) removeclass: noscroll/.sub-nav .nav"
							pos-action-4="(tap) call: hidekeyboard"
						>&times;</span>
					</form>
				</div>
				<div class="center buttons type">
					<div class="btn btn-left active">On Tap</div>
					<div class="btn btn-right">Retail</div>
				</div>
				<div class="right zip">
					<span class="icon-target"></span>
				</div>
			</div>		
				
			<div class="tap-list">
				<div class="map-result pos-invisible">Results for "<span></span>"</div>
				<div class="list"></div>
			</div>
		</div>
	</div>
	
	<!--
	<section pos-view="taplist" class="tap-list pos-visible"></section>
	<section pos-view="single" class="single pos-invisible"></section>
	-->

</body>
</html>