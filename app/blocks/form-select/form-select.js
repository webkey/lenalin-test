app.formSelect = {
	initElement: '.js-form-select',
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
			$(el[i]).select2({
				theme: 'custom',
				language: 'ru',
				width: '100%',
				containerCssClass: 'form-select-head',
				dropdownCssClass: 'form-select-drop',
			});
		}
	},
};
