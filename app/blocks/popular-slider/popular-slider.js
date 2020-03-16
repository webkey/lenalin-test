app.popularSlider = {
	sliderElement: '.js-popular-slider',
	init() {
		app.common.initScript('swiper.min', 'Swiper', () => {
			this.lazyLoad();
			this.runSlider();
		});
		app.common.initStyle('swiper.min');
	},
	lazyLoad() {
		const self = this;
		app.common.initScript('lazyload.min', 'LazyLoad', () => {
			app.lazyLoadNewsSliderInstance = new LazyLoad({
				threshold: 50,
				elements_selector: self.sliderElement + ' .lazy-load',
				class_loaded: 'image-loaded'
			});
		});
	},
	runSlider() {
		const $slider = $(this.sliderElement);

		if ($slider.length) {
			$.each($slider, function () {
				const $curSlider = $(this);
				const $nextEl = $curSlider.find('.js-popular-slider__button-next');
				const $prevEl = $curSlider.find('.js-popular-slider__button-prev');

				const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
					init: false,
					loop: true,
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 30,
					watchSlidesVisibility: true,
					lazy: true,

					navigation: {
						nextEl: $nextEl,
						prevEl: $prevEl
					},

					breakpoints: {
						767: {
							slidesPerView: 2,
							slidesPerGroup: 2,
							spaceBetween: 20
						},
						575: {
							slidesPerView: 1,
							slidesPerGroup: 1,
							spaceBetween: 16
						},
					},

					on: {
						slideChangeTransitionEnd() {
							if (app.lazyLoadNewsSliderInstance) {
								app.lazyLoadNewsSliderInstance.update();
							}
						}
					}
				});

				sliderInstance.on('init', function () {
					$curSlider.addClass('is-loaded');
				});

				sliderInstance.init();
			})
		}
	}
};
