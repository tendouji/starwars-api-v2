(function(app) {
	app.AppUIFooter = 
		ng.core.Component({
			selector: 'ui-footer',
			template: `
				<footer>
					<div class="wrapper">
						<span>Copyright &copy; 2017 &bull; Tendouji</span>
					</div>
				</footer>
			`
		})
		.Class({
			constructor: function() {

			}
		});
})(window.app || (window.app = {}));