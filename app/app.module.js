(function(app) {
	app.AppModule = 
		ng.core.NgModule({
			imports: [ ng.platformBrowser.BrowserModule ],
			declarations: [ app.AppComponent, app.AppUIHeader, app.AppUIFooter, app.AppUIMain],
			bootstrap: [ app.AppComponent, app.AppUIHeader, app.AppUIFooter, app.AppUIMain ]
		})
		.Class({
			constructor: function() {

			}
		});
})(window.app || (window.app = {}));