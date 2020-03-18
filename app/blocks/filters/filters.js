app.filters = {
	initEl: '.js-filters',
	filtersItemEl: '.js-filters-li',
	filtersPanelEl: '.js-filters-drop',
	filtersSwitcherEl: '.js-filters-arrow',
	filterEl: '.js-filter',
	switcherFiltersEl: '.js-filters-menu-switcher',
	init() {
		app.common.initScript('jquery.accordion-simple', 'accordionSimple', () => {
			if ($(this.initEl).length) {
				this.events();
			}
		});

		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			const $switcherEl = $(this.switcherFiltersEl);
			if ($switcherEl.length) {
				this.toggleFilterPanel(this.switcherFiltersEl);
			}
		});
	},
	events() {
		const self = this;
		const $filters = $(this.initEl);
		const filtersAccordion = $filters.accordionSimple({
			// Elements
			block: self.filtersItemEl,
			panel: self.filtersPanelEl,
			switcher: self.filtersSwitcherEl,
			// Additional settings
			collapsed: false,
			duration: 200,
		});

		$filters.on('click', self.filtersItemEl + ' > a', function (e) {
			// Prevent click if need
			e.preventDefault();
			const $curEl = $(this);
			const $curItem = $curEl.closest(self.filtersItemEl);

			// Show preloader
			app.preloader.show($curEl.closest(self.initEl).parent(), 'fit', 'small');

			// setTimeout for example
			setTimeout(() => {
				if ($curItem.hasClass('current')) {
					$(self.filterEl, $curItem).prop('checked', false);

					// Filtered...

					$curItem
						.removeClass('current')
						.find(self.filtersItemEl)
						.removeClass('current');
				} else {
					// Filtered...

					// Then show filters
					const $drop = $curEl.siblings(self.filtersPanelEl);
					if ($drop.length) {
						filtersAccordion.accordionSimple('open', $drop, function () {
							$curItem.addClass('current');
						});
					} else {
						$curItem.addClass('current');
					}
				}

				// Hide preloader
				app.preloader.hide();
			}, 500);
		});

		$filters.on('change', self.filterEl, function () {
			const $curEl = $(this);

			// Show preloader
			app.preloader.show($curEl.closest(self.initEl).parent(), 'fit', 'small');

			// setTimeout for example
			setTimeout(() => {
				$curEl.parentsUntil(self.initEl).filter(self.filtersItemEl).addClass('current');

				// Hide preloader
				app.preloader.hide();
			}, 500);
		});
	},
	toggleFilterPanel(el) {
		const $switcherEl = $(el);
		const $html = $('html');
		$switcherEl.switchClass({
			removeExisting: true,
			switchClassTo: $('.js-filters-menu').add('.js-filters-menu-overlay'),
			removeEl: $('.js-filters-menu-close').add('.js-filters-menu-overlay'),
			cssScrollFixed: true,
			preventRemoveClass: 'js-prevent-hide',
			modifiers: {
				activeClass: 'filters-menu-is-open'
			},
			afterAdd() {
				$html.addClass('open-only-mob');
			},
			afterRemove() {
				$html.removeClass('open-only-mob');
			}
		});
	},
};
