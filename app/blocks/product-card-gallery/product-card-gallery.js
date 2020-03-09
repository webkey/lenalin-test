app.productCardGallery = {
	sliderElement: '.p-card-gallery-js',
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
			const cardGalleryThumbsTpl = $('<div class="p-card-gallery-thumbs"><div class="p-card-gallery-thumbs__arrow-prev arrow-prev-js"></div><div class="swiper-container"><div class="swiper-wrapper"></div></div><div class="p-card-gallery-thumbs__arrow-next arrow-next-js"></div></div>');

			$slider.each(function () {
				const $curSlider = $(this);
				const $imgList = $curSlider.find('.p-card-gallery-images-js');
				const $imgListItem = $imgList.find('img').parent();

				// create thumbs
				$imgList.after(cardGalleryThumbsTpl.clone());

				const $galleryThumbs = $curSlider.find('.p-card-gallery-thumbs');
				const $galleryThumbsArrPrev = $galleryThumbs.find('.arrow-prev-js');
				const $galleryThumbsArrNext = $galleryThumbs.find('.arrow-next-js');

				$.each($imgListItem, function () {
					const $this = $(this);
					$galleryThumbs.find('.swiper-wrapper').append($('<div class="swiper-slide p-card-gallery-thumbs__item"><img src="' + $this.find('img').attr('data-thumb') + '" alt="' + $this.find('img').attr('alt') + '"></div>'));
				});

				const cardImgSlider = new Swiper($imgList, {
					init: false,
					spaceBetween: 20,
					preloadImages: false,
					lazy: {
						loadPrevNext: true,
						loadOnTransitionStart: true
					},
					thumbs: {
						swiper: {
							el: $galleryThumbs.find('.swiper-container'),
							direction: 'vertical',
							slidesPerView: 'auto',
							spaceBetween: 14,
							freeMode: true,
							slideToClickedSlide: true,
							watchSlidesVisibility: true,
							watchSlidesProgress: true,
							navigation: {
								nextEl: $galleryThumbsArrNext,
								prevEl: $galleryThumbsArrPrev,
							},
							breakpoints: {
								767: {
									direction: 'horizontal'
								}
							}
						},
					},
					on: {
						/*lazyImageReady: function (slide, image) {
							objectFitImages($(image));
						}*/
					}
				});

				cardImgSlider.on('init', function () {
					$curSlider.addClass('is-loaded');
					// object-fit for non-support browsers
					// objectFitImages($('img', $(cardImgSlider.el)));
				});

				cardImgSlider.init();

				/*$().fancybox({
					selector: '.p-card-gallery-js a:visible',
					infobar: true,
					baseClass: 'white-spaces',
					buttons: [
						"zoom",
						//"share",
						// "slideShow",
						//"fullScreen",
						//"download",
						// "thumbs",
						"close"
					],
					beforeClose(instance, current) {
						cardImgSlider.slideTo(current.index);
					}
				});*/
			});
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
