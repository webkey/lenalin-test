app.flipOfferBgDescr = {
	controlElement: '.js-btn-flip',
	containerElement: '.js-container-flip',
	activeClass: 'flip-active',
	init() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			if ($(this.controlElement).length) {
				this.runFlip();
			}
		});
	},
	runFlip() {
		const self = this;
		$(self.controlElement).switchClass({
			removeExisting: true,
			preventRemoveClass: 'js-flip-prevent-hide',
			modifiers: {
				activeClass: self.activeClass
			},
			afterAdd(e, el) {
				$(el).closest(self.containerElement).addClass(self.activeClass);
			},
			afterRemove(e, el) {
				$(el).closest(self.containerElement).removeClass(self.activeClass);
			}
		});
	}
};
