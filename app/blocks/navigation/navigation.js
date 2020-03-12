app.navigation = {
	navElement: '.js-nav',
	init() {
		app.common.initScript('jquery.accordion-simple', 'accordionSimple', () => {
			app.common.initScript('jquery.nav', 'nav', () => {
				if ($(this.navElement).length) {
					this.runNavigation();
				}
			});
		});
	},
	runNavigation() {
		$(this.navElement).nav({
			// Elements
			item: '.js-nav-li',
			drop: '.js-nav-drop',
			arrow: '.js-nav-arrow',
			// Additional settings
			arrowEnable: true,
			submenuPosition: false
		});
	}
};
