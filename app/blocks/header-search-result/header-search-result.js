app.headerSearchResultTest = {
	inputElement: '.header-search__input',
	resultsElement: '.header-search-result',
	init() {
		const self = this;
		$(self.inputElement).on('keyup', function () {
			self.toggleStateClass.call(this, $(this).val().length > 1);
		});
		$('html').on('click', function (event) {
			if (!$(event.target).closest(self.inputElement).length) {
				$(self.resultsElement).hide();
			}
		});
	},
	toggleStateClass(cond) {
		const $search = $(this).closest('.header-search');

		if (cond) {
			$search.addClass('active');
			$search.find(app.headerSearchResultTest.resultsElement).show();
		} else {
			$search.removeClass('active');
			$search.find(app.headerSearchResultTest.resultsElement).hide();
		}
	}
};
