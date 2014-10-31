<?php
	include('header.php');
?>

	<header pos-view="header" class="pos-visible" pos-view-params="title: Beer Selector; page: selector;"></header>
	
	<!--
	<section pos-view="beerfinder" class="pos-visible beer-finder"></section>
	-->
	<section pos-view="forms" class="single pos-invisible" pos-view-params="action: login;"></section>
	<section pos-view="results" class="results pos-visible"></section>
	<section pos-view="single" class="single pos-invisible"></section>
	
	<!--
	<footer>
		<ul>
			<li 
				pos-action-1="hideview: beerfinder"
				pos-action-2="showview: taplist">Tap List</li>
			<li
				pos-action-1="hideview: taplist"
				pos-action-2="showview: beerfinder">Beer Finder</li>
		</ul>
	</footer>
	<img src="img/logo.png" class="logo" alt="logo" width="62" />
	-->
</body>

</html>