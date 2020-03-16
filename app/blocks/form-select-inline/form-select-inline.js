app.formSelectInline = {
	initElement: '.js-form-select-inline',
	init(selector) {
		app.common.initScript('select2.full.min', 'select2', () => {
			const el = document.querySelectorAll(selector || this.initElement);
			if (el.length) {
				this.run(el);
			}
		});
		app.common.initStyle('select2.min');
	},
	run(el) {
		for (let i = 0; i < el.length; i++) {
			const curEl = el[i];
			const dataSearch = curEl.getAttribute('data-search');
			const showSearch = dataSearch === null || dataSearch === 'false' ? Infinity : 0;
			$(curEl).select2({
				theme: 'custom',
				language: 'ru',
				width: '100%',
				dropdownAutoWidth: true,
				minimumResultsForSearch: showSearch,
				containerCssClass: 'form-select-inline__selection',
				dropdownCssClass: 'form-select-inline__dropdown',
			});
		}
	},
};
