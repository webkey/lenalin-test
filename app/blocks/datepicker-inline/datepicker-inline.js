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
			wrap: true,
			dateFormat: 'm.d.Y',
			locale: {
				firstDayOfWeek: 1,
				weekdays: {
					shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
					longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
				},
				months: {
					shorthand: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
					longhand: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
				},
			},
		});
	}
};
