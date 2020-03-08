import gulp from 'gulp';
import plumber from 'gulp-plumber';
import fileinclude from 'gulp-file-include';
import htmlbeautify from 'gulp-html-beautify';

gulp.task('templates', () => (
	gulp.src('app/pages/*.html')
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(htmlbeautify({
			"indent_with_tabs": true,
			"indent_size": 4,
			"max_preserve_newlines": 0
		}))
		.pipe(gulp.dest('dist/'))
));
