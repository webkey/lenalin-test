app.preloader = {
	show(container = $('body'), type = 'static', size = 'normal') {
		// type: static, cover, fit
		// size: normal, small, large
		const $container = $(container);
		if ($container.has('.js-preloader').length) {
			$('.js-preloader').addClass('active');
		} else {
			const tpl = `<div class="preloader js-preloader preloader_${type}">
						<div class="preloader__figure preloader__figure_${size}"></div>
					</div>`;
			if (type === 'fit' && $container.css('position') === 'static') {
				$container.css('position', 'relative');
			}
			$(tpl).clone().appendTo($container).addClass('active');
		}
	},
	hide(preloader = null) {
		const $preloader = $(preloader);
		if (preloader) {
			$preloader.removeClass('active');
		} else {
			$('.js-preloader').removeClass('active');
		}
	},
};
