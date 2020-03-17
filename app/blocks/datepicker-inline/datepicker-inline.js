app.datepickerInline = {
	datepickerElement: '.js-datepicker',
	init(selector) {
		app.common.initScript('flatpickr.min', 'flatpickr', () => {
			const el = document.querySelectorAll(selector || this.datepickerElement);
			if (el.length) {
				this.createDatepicker(el);
			}
		});
		app.common.initStyle('flatpickr.min');
	},
	createDatepicker(el) {
		flatpickr(el, {
			wrap: true
		});
	},
};
