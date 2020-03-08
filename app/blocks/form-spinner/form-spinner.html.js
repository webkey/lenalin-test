app.formSpinner = {
	spinnerElement: '.js-form-spinner',
	init(selector) {
		const $spinner = $(selector || this.spinnerElement);
		if ($spinner.length) {
			this.runSpinner($spinner);
		}
	},
	runSpinner(spinner) {
		$.each(spinner, function () {
			const $curSpinner = $(this);
			const $tplSpinner = $('<div>', {
				class: 'spinner'
			});
			const $tplBtnDown = $('<button>', {
				class: 'spinner__btn spinner__btn_down',
				html: '<i class="spinner__btn-icon spinner__btn-icon_down">-</i>'
			});
			const $tplBtnUp = $('<button>', {
				class: 'spinner__btn spinner__btn_up',
				html: '<i class="spinner__btn-icon spinner__btn-icon_up">+</i>'
			});
			$curSpinner.addClass('spinner__input').wrap($tplSpinner.clone()).before($tplBtnDown).after($tplBtnUp);
			$('body').on('click', '.spinner__btn', function (e) {
				e.preventDefault();

				const $curBtn = $(this);
				const $curInput = $curBtn.closest('.spinner').find($curSpinner);
				let value = Number($curInput.val());

				if ($curBtn.hasClass('spinner__btn_up')) {
					++value;
				} else {
					--value;
				}

				value = value < 0 ? 0 : value;
				$curInput.val(value);
			});
		});
	}
};
