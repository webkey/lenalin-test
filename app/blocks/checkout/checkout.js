app.checkout = {
	formEl: '.js-checkout-from',
	cardEl: '.js-checkout-card',
	dateCheckEl: '.js-choose-date',
	datepickerEl: '.js-checkout-datepicker',
	btnPayEl: '.js-btn-pay',
	btnOrderEl: '.js-btn-order',
	init() {
		const self = this;
		app.common.initScript('flatpickr.min', 'flatpickr', () => {
			const el = document.querySelectorAll(self.dateCheckEl);
			if (el.length) {
				self.createDatepicker();
				self.openDatepicker();
			}
		});
		app.common.initStyle('flatpickr.min');
		app.common.initScript('jquery.validate.min', 'validate', () => {
			self.steps();
		});
	},
	createDatepicker() {
		const self = this;
		const $el = $(self.datepickerEl);
		const $buffer = $('<div>', {
			class: 'input-buffer'
		});
		$.each($el, function () {
			const $curEl = $(this);
			$buffer.clone().prependTo($curEl).hide();

			const $butter = $curEl.find('.input-buffer');
			const $curInput = $curEl.find('input');

			$butter.text($curInput.attr('placeholder'));
			$curInput.width($butter.width());

			$curEl.flatpickr({
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
				onOpen() {
					$curEl.closest('label').find(self.dateCheckEl).prop('checked', true);
				},
				onChange() {
					$butter.text($curInput.val());
					$curInput.width($butter.width());
				}
			});
		});
	},
	openDatepicker() {
		const self = this;
		$('body').on('change', self.dateCheckEl, function () {
			if ($(this).prop('checked')) {
				$(this).closest('label').find(self.datepickerEl).find('input').focus();
			}
		});
	},
	steps() {
		const self = this;
		$('body').on('click', self.btnOrderEl, function (e) {
			e.preventDefault();
			const $curBtn = $(this);
			const $curForm = $curBtn.closest(self.formEl);
			$curForm.find(self.cardEl).show();
			$curForm.find(self.btnPayEl).show();
			$curBtn.hide();
		});
	}
};
