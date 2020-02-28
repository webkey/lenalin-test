app.headerSearch = {
	controlElement: '.js-header-search-control',
	closeElement: '.js-header-search-close',
	panelElement: '.js-header-search-panel',
	inputElement: '.js-header-search-input',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			if ($(this.controlElement).length) {
				this.runHeaderSearch();
			}
		});
	},
	runHeaderSearch() {
		const self = this;
		const $input = $(self.inputElement);
		$(self.controlElement).switchClass({
			removeExisting: true,
			switchClassTo: $(self.panelElement).add(self.wrapElement),
			removeEl: $(self.closeElement),
			preventRemoveClass: 'js-header-search-prevent-hide',
			modifiers: {
				activeClass: 'header-search-panel-is-open'
			},
			afterAdd() {
				setTimeout(function () {
					$input.focus();
				}, 50);
			},
			afterRemove() {
				setTimeout(function () {
					$input.blur();
				}, 50);
			}
		});
	}
};
