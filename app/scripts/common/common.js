app.common = {
	name: 'common',
	description: 'application support functions',
	init() {
		this.initScript('svg4everybody.min', 'svg4everybody', () => {
			svg4everybody();
		});
	},
	addScriptFile(nameFile, callback) {
		const body = document.getElementsByTagName('body')[0];
		const script = document.createElement('script');
		script.onload = () => callback && callback();
		script.src = `${app.pathToLibsFiles}/js/${nameFile}.js`;
		body.appendChild(script);
	},
	addStyleFile(nameFile) {
		const appCss = document.getElementById('app-css');
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = `${app.pathToLibsFiles}/css/${nameFile}.css`;
		appCss.before(link);
	},
	initScript(nameFile, nameLib, callback) {
		let hasLibs = null;
		$('script').each(function () {
			const str = $(this).attr('src');
			if (str) {
				if (str.indexOf(nameFile) >= 0) {
					hasLibs = true;
				}
			}
		});
		if (!hasLibs) {
			this.addScriptFile(nameFile, callback);
		} else {
			const timerId = setInterval(() => {
				if ($()[nameLib] || window[nameLib]) {
					callback();
					clearInterval(timerId);
				}
			}, 1);
		}
	},
	initStyle(nameFile) {
		let hasLibs = null;
		$('link').each(function () {
			const str = $(this).attr('href');
			if (str) {
				if (str.indexOf(nameFile) >= 0) {
					hasLibs = true;
				}
			}
		});
		if (!hasLibs) {
			this.addStyleFile(nameFile);
		}
	},
	initLazyLoad() {
		app.common.initScript('lazyload.min', 'LazyLoad', () => {
			new LazyLoad({
				threshold: 50,
				elements_selector: '.lazy-load'
			});
		});
	},
	initTouchEvents() {
		app.touchevents = ('ontouchstart' in document.documentElement);
	},
	toggleMobMenu() {
		app.common.initScript('jquery.switch-class', 'switchClass', () => {
			const $controlElement = $('.js-mob-menu-control');
			const $html = $('html');
			if ($controlElement.length) {
				$controlElement.switchClass({
					removeExisting: true,
					switchClassTo: $('.js-mob-menu').add('.js-mob-menu-overlay'),
					removeEl: $('.js-mob-menu-close').add('.js-mob-menu-overlay'),
					cssScrollFixed: true,
					preventRemoveClass: 'js-mob-menu-prevent-hide',
					modifiers: {
						activeClass: 'mob-menu-is-open'
					},
					afterAdd() {
						$html.addClass('open-only-mob');
					},
					afterRemove() {
						$html.removeClass('open-only-mob');
					}
				});
			}
		});
	},
	initSimpleBar() {
		app.common.initScript('simplebar.min', 'SimpleBar', () => {
			const $simplebar = $('.js-simplebar');
			if ($simplebar.length) {
				$simplebar.each(function (index, element) {
					new SimpleBar(element, {
						autoHide: false
					});
				});
			}
		});
		app.common.initStyle('simplebar.min');
	},
};
