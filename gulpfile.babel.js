import gulp from 'gulp';
import through from 'through2';
import marked from 'marked';
import nunjucks from 'nunjucks';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

gulp.task('html', function () {
	return gulp.src('talks/*.md')
		.pipe(through.obj(function (file, enc, cb) {
			let markdown = file.contents.toString(enc);

			let html = markdown
					.split('\n\n----\n\n')
					.map((slide) => marked(slide, { langPrefix: 'language-' }))
					.map((slide) => `<div class="${classes(slide)}">${slide}</div>`)
					.join('');

			file.contents = new Buffer(nunjucks.render('assets/template.html', {
				title: /<h1[^>]+>(.+)<\/h1>/.exec(html)[1],
				html
			}));

			file.path = file.path.replace('.md', '.html');

			cb(null, file);
		}))
		.pipe(gulp.dest('app'));

	function classes(slide) {
		let classes = 'slide';

		if (slide.includes('<h1') || (!slide.includes('<h') && slide.includes('<img'))) {
			classes += ' slide--title';
		}

		return classes;
	}
});

gulp.task('css', function () {
	return gulp.src('assets/css/style.css')
		.pipe(postcss([ autoprefixer, postcssImport ]))
		.pipe(gulp.dest('app'));
});

gulp.task('js', function () {
	let bundler = browserify({
		entries: 'assets/js/script.js',
		debug: true,
		transform: [babelify]
	});

	return bundler.bundle()
		.pipe(source('script.js'))
		.pipe(gulp.dest('app'));
});

gulp.task('default', gulp.parallel('html', 'css', 'js'));

if (process.argv.indexOf('--watch') !== -1) {
	gulp.watch('assets/css/**/*.css', gulp.series('css'));
	gulp.watch('assets/js/**/*.js', gulp.series('js'));
	gulp.watch(['assets/*.html', 'talks/*.md'], gulp.series('html'));
}