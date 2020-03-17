app.successPopup = {
	popupElement: '#successful-popup',
	init(selector, autoClose = true, delay) {
		app.common.initScript('jquery.fancybox.min', 'fancybox', () => {
			const el = selector || this.popupElement;
			const del = delay || 3000;
			autoClose = false;
			let timeout;
			if ($(el).length) {
				$.fancybox.open({
					src: el,
					type: 'inline',
					opts: {
						closeExisting: true,
						baseClass: 'fancybox-successful-popup',
						afterShow() {
							clearTimeout(timeout);

							timeout = setTimeout(() => {
								if (autoClose) {
									$.fancybox.close();
								}
							}, del);
						},
						btnTpl: {
							smallBtn:
								'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
								'<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.0002 10.586L16.9502 5.636L18.3642 7.05L13.4142 12L18.3642 16.95L16.9502 18.364L12.0002 13.414L7.05023 18.364L5.63623 16.95L10.5862 12L5.63623 7.05L7.05023 5.636L12.0002 10.586Z" /></svg>' +
								'</button>'
						},
						afterClose() {
							clearInterval(timeout);
						}
					}
				});
			}
		});
		app.common.initStyle('jquery.fancybox.min');
	}
};

