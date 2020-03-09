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

				value = value < 1 ? 1 : value;
				$curInput.val(value);
			});

			$curSpinner.on('keyup', function () {
				const $curEl = $(this);
				let value = parseFloat($curEl.val());

				if ($curEl.val() === '' ) {
					$curEl.val('');
				} else if (value) {
					$curEl.val(value < 1 ? 1 : value);
				} else {
					$curEl.val(1);
				}
			});

			$curSpinner.on('blur', function () {
				const $curEl = $(this);
				if ($curEl.val() === '') {
					$curEl.val(1);
				}
			})

			// $curSpinner.on('keyup', function (e) {
			// 	const $curEl = $(this);
			// 	let value = Number($curEl.val());
			// 	if (e.key === 'ArrowUp') {
			// 		e.preventDefault();
			// 		++value;
			// 	}
			// 	if (e.key === 'ArrowDown' && value > 1) {
			// 		e.preventDefault();
			// 		--value;
			// 	}
			// 	$curEl.val(value);
			// })
		});
	}
};
