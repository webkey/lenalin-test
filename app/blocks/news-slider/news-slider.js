app.newsSlider = {
	sliderElement: '.js-news-slider',
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
		slidesPerView: 3,
		slidesPerGroup: 3,
		spaceBetween: 30,
		watchSlidesVisibility: true,
		lazy: true,

		pagination: {
			type: 'fraction',
			el: '.js-news-slider__pagination',
			currentClass: 'news-slider__fraction-current',
			totalClass: 'news-slider__fraction-total',
			renderBullet(index, className) {
				return '<div class="' + className + '"><span></span></div>';
			}
		},

		navigation: {
			nextEl: '.js-news-slider__button-next',
			prevEl: '.js-news-slider__button-prev'
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
	}
};
