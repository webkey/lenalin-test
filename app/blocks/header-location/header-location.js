app.headerLocation = {
	controlElement: '.js-header-location-control',
	arrowElement: '.js-header-location-arrow',
	dropElement: '.js-header-location-drop',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			if ($(this.controlElement).length) {
				this.runToggleHeaderLocation();
			}
		});
	},
	runToggleHeaderLocation() {
		const self = this;
		$(self.controlElement).switchClass({
			removeExisting: window.innerWidth >= 992,
			switchClassTo: $(self.arrowElement).add(self.dropElement),
			modifiers: {
				activeClass: 'drop-is-open'
			}
		});
	}
};
