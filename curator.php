<?php
	include('header.php');
?>

	<header p-view="header" class="p-visible" p-view-params="title: Beer Curator; page: selector;"></header>
	
	<!--
	<section p-view="beerfinder" class="p-visible beer-finder"></section>
	-->
	<!-- <section p-view="forms" class="single p-invisible" p-view-params="action: login;"></section> -->
	<section p-view="results" class="results p-visible"></section>
	<!-- <section p-view="single" class="single p-invisible"></section> -->
	
	<!--
	<footer>
		<ul>
			<li 
				p-action-1="hideview: beerfinder"
				p-action-2="showview: taplist">Tap List</li>
			<li
				p-action-1="hideview: taplist"
				p-action-2="showview: beerfinder">Beer Finder</li>
		</ul>
	</footer>
	<img src="img/logo.png" class="logo" alt="logo" width="62" />
	-->
</body>

</html>