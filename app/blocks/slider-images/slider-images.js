app.sliderImages = {
	sliderElement: '.js-slider-images',
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
			app.lazyLoadSliderImagesInstance = new LazyLoad({
				threshold: 50,
				elements_selector: self.sliderElement + ' .lazy-load'
			});
		});
	},
	runSlider() {
		const $slider = $(this.sliderElement);

		if ($slider.length) {
			const slider = new Swiper(this.sliderElement, this.options);

			slider.on('init', function () {
				$slider.addClass('is-loaded');
			});

			slider.init();
		}
	},
	options: {
		init: false,
		loop: true,
		slidesPerView: 1,
		slidesPerGroup: 1,
		watchSlidesVisibility: true,

		navigation: {
			nextEl: '.js-slider-images__button-next',
			prevEl: '.js-slider-images__button-prev'
		},

		on: {
			slideChangeTransitionEnd() {
				if (app.lazyLoadSliderImagesInstance) {
					app.lazyLoadSliderImagesInstance.update();
				}
			}
		}
	}
};
