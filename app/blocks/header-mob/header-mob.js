app.headerMob = {
	headerMob: '.js-header-mob',
	init(addClassPosition) {
		const self = this;

		$(window).on('resize scroll', function () {
			if ($(self.headerMob).is(':visible')) {
				self.runToggleScrollClass(addClassPosition);
			}
		});

		if ($(self.headerMob).is(':visible')) {
			self.runToggleScrollClass(addClassPosition);
		}
	},
	runToggleScrollClass(addClassPosition) {
		const scrollTop = $(window).scrollTop();

		addClassPosition = addClassPosition || 10;
		this.toggleClassOnScroll(scrollTop, addClassPosition);
	},
	toggleClassOnScroll(scrollTop, addClassPosition) {
		$(this.headerMob).toggleClass('active', (scrollTop > addClassPosition));
	}
};
