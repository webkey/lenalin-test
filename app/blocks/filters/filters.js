app.filters = {
	initElement: '.js-filters',
	filtersItemElement: '.js-filters-li',
	filtersPanelElement: '.js-filters-drop',
	filtersSwitcherElement: '.js-filters-arrow',
	filterElement: '.js-filter',
	init() {
		app.common.initScript('jquery.accordion-simple', 'accordionSimple', () => {
			if ($(this.initElement).length) {
				this.runNavigation();
			}
		});
	},
	runNavigation() {
		const self = this;
		const $filters = $(this.initElement);
		const filtersAccordion = $filters.accordionSimple({
			// Elements
			block: self.filtersItemElement,
			panel: self.filtersPanelElement,
			switcher: self.filtersSwitcherElement,
			// Additional settings
			collapsed: false,
			duration: 200,
		});

		$filters.on('click', self.filtersItemElement + ' > a', function (e) {
			// Prevent click if need
			e.preventDefault();
			const $curEl = $(this);
			const $curItem = $curEl.closest(self.filtersItemElement);

			// Show preloader
			app.common.preloader.show($curEl.closest(self.initElement).parent(), 'fit', 'small');

			// setTimeout for example
			setTimeout(() => {
				if ($curItem.hasClass('current')) {
					$(self.filterElement, $curItem).prop('checked', false);

					// Filtered...

					$curItem
						.removeClass('current')
						.find(self.filtersItemElement)
						.removeClass('current');
				} else {
					// Filtered...

					// Then show filters
					filtersAccordion.accordionSimple('open', $curEl.siblings(self.filtersPanelElement), function () {
						$curItem.addClass('current');
					});
				}

				// Hide preloader
				app.common.preloader.hide();
			}, 500);
		});

		$filters.on('change', self.filterElement, function () {
			const $curEl = $(this);

			// Show preloader
			app.common.preloader.show($curEl.closest(self.initElement).parent(), 'fit', 'small');

			// setTimeout for example
			setTimeout(() => {
				$curEl.parentsUntil(self.initElement).filter(self.filtersItemElement).addClass('current');

				// Hide preloader
				app.common.preloader.hide();
			}, 500);
		});
	}
};
