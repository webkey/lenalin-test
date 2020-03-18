app.headerPhones = {
	controlElement: '.js-header-phones-control',
	dropElement: '.js-header-phones-drop',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			if ($(this.controlElement).length) {
				this.runToggleHeaderPhones();
			}
		});
	},
	runToggleHeaderPhones() {
		const self = this;
		$(self.controlElement).switchClass({
			removeExisting: true,
			switchClassTo: $(self.dropElement),
			modifiers: {
				activeClass: 'drop-is-open'
			}
		});
	}
};
