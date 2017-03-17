(function(app) {
	app.AppComponent = 
		ng.core.Component({
			selector: 'starwars-viewer',
			template: `
				<ui-header></ui-header>
				<ui-main></ui-main>
				<ui-footer></ui-footer>

				<div id="preloader" class="preloader"></div>
				`,
			directives: [app.AppUIHeader, app.AppUIFooter]
		})
		.Class({
			constructor: function() {
				var shipList = [5, 9, 10, 11, 15],
				    swapiDomain = 'http://swapi.co/api/',
				    swapiUrl = swapiDomain + 'starships/',
				    shipAttributes = ['name', 'model', 'manufacturer', 'crew', 'edited'],
				    shipsInfo = [],

				    messageList = {
				        'start': 'Getting content from ' + swapiDomain + '...', 
				        'noInternet': 'You seemed to be offline! Please check your Internet connection.'
				    },

				    /* dom element */
				    preloader,
				    menuSelect,
				    messagePanel,
				    spaceshipList;

			}
		});
})(window.app || (window.app = {}));