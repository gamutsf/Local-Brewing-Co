<?php
	include('header.php');
?>

<header pos-view="header" class="pos-visible" pos-view-params="title: Home;"></header>

	<main id="home">
	
		<div class="brew-together">
			<img src="img/home-top-logo.png" alt="home-top-logo" width="244" />
			<h1>Let's brew this <span>together</span></h1>
		</div>
		
		<div class="quick-links">
			<h4>Quick Links</h4>
			<ul>
				<li><a href="taplist.php">On tap</a></li>
					<svg width="100%" height="10px" style="display: block;">
						<line x1="7" x2="100%" y1="2" y2="2" stroke="#5184AF" stroke-width="2" stroke-linecap="round" stroke-dasharray="1, 8" style="stroke: #373737;"></line>
					</svg>
				<li><a href="selector.php">Beer selector</a></li>
					<svg width="100%" height="10px" style="display: block;">
						<line x1="7" x2="100%" y1="2" y2="2" stroke="#5184AF" stroke-width="2" stroke-linecap="round" stroke-dasharray="1, 8" style="stroke: #373737;"></line>
					</svg>
				<li><a href="map.php">Beer map</a></li>
			</ul>
		</div>
		
		<div class="contact">
			<p class="address clearfix">
				<span>69</span> 
				<span>Bluxome St.</span> 
				<span>San Francisco, CA 94107</span>
			</p>
			<div class="hours">
				<h5>Open daily</h5>
				<ul>
					<li><span>Monday</span> ........................ 3pm - 12pm</li>
					<li><span>Tuesday</span> ....................... 3pm - 12pm</li>
					<li><span>Wednesday</span> .................. 3pm - 12pm</li>
					<li><span>Thursday</span> .................... 3pm - 12pm</li>
					<li><span>Friday</span> .......................... 3pm - 12pm</li>
					<li><span>Saturday</span> .................... 3pm - 12pm</li>
				</ul>
				<a class="phone" href="tel: 415-555-5555">(415) 555-5555</a>
			</div>	
		</div>
		
		<div class="map-area">
			<img src="img/home-map-pin.png" alt="map pin" />
		</div>
		
		<div class="selector-snippet">
			<h3>Find your <span>perfect brew</span></h3>
			<div class="preview clearfix">
				<img src="img/roundy.png" alt="home-selector-img" />
			</div>
			<ul class="clearfix">
				<li>Explore our beer list by Hoppyness, Alcohol Volume, and Complexity</li>
				<li>Save a custom flavor profile to compare beers</li>
				<li>Keep a list of your favorite beers</li>
			</ul>
			<div class="action clearfix">
				<svg width="100%" height="10px">
					<line x1="7" x2="100%" y1="2" y2="2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="1, 8" style="stroke: #fff;"></line>
				</svg>
				<a href="selector.php">Try the beer finder</a>
				<svg width="100%" height="10px">
					<line x1="7" x2="100%" y1="2" y2="2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="1, 8" style="stroke: #fff;"></line>
				</svg>
			</div>
		</div>
		
		<div class="statement">
			<div style="text-align: right;padding-right: 30px;">
				<img src="img/home-footer-logo.png" width="111" alt="home-footer-logo" />
			</div>
			<div style="text-align: left;padding-right: 20px; padding-left:0px;">
				<p class="handbrewed">
					Brewed by hand in<br>san francisco, ca 
					<span>since 2010</span>
				</p>
			</div>
		</div>
	
	</main>
</body>
</html>
