(function(app) {
	app.AppUIHeader = 
		ng.core.Component({
			selector: 'ui-header',
			template: `
<header>
	<div class="wrapper">
		<h1>Star Wars Spaceship!</h1>
		<nav>
			<ul>
				<li>
					<a href="javascript.html">Good ol' Vanilla JS</a>
				</li>
				<li>
					<a href="jquery.html">jQuery + SASS</a>
				</li>
				<li>
					<a class="selected" href="index.html">Angular JS + SASS</a>
				</li>
			</ul>
			<select>
				<option value="javascript.html">Good ol' Vanilla JS</option>
				<option value="jquery.html" selected="selected">jQuery + SASS</option>
				<option value="index.html">Angular JS + SASS</option>
			</select>
		</nav>
	</div>
</header>
`
		})
		.Class({
			constructor: function() {

			}
		});
})(window.app || (window.app = {}));