app.formElement = {
	showPassBtnElement: '.js-show-pass',
	showPassActiveClass: 'is-show',
	togglePassword() {
		const self = this;
		if ($(this.showPassBtnElement).length) {		$('body').on('click', self.showPassBtnElement, function (e) {
			const $curBtn = $(this);
			const $curInput = $curBtn.parent().find('input');

			$curInput.attr('type', 'text');

			if (!$curBtn.hasClass(self.showPassActiveClass)) {
				$curBtn.addClass(self.showPassActiveClass);
				$curInput.attr('type', 'text');
			} else {
				$curBtn.removeClass(self.showPassActiveClass);
				$curInput.attr('type', 'password');
			}

			e.preventDefault();
		});

		}
	}
};
