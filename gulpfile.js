var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	html2jade = require('gulp-html2jade'),
	webserver = require('gulp-webserver'),
	// imagemin = require('gulp-imagemin'),
	// iconfont = require('gulp-iconfont'),
	notify = require('gulp-notify');


gulp.task('webserver', function(){
	gulp.src('dist')
		.pipe(webserver({
			livereload: true,
      		open: true
		})
	);
});

gulp.task('template', function(){
	gulp.src('app/templates/pages/*.jade')
		.pipe(jade({
			pretty: true
		}))	
		.pipe(gulp.dest('dist'))
});

gulp.task('scss',  function() {
    gulp.src(['app/scss/main.scss'])
		.pipe(sass())
		.pipe(notify('CSS-файлы успешно обновлены!'))
		.pipe(gulp.dest('dist/css/'));
});

// gulp.task('image', function() {
//     gulp.src('src/img/*')
//       .pipe(imagemin({
//       	progressive: true
//       }))
//       .pipe(gulp.dest('public/img'));
// });

// gulp.task('media', function() {
//     gulp.src('src/content/*')
//       .pipe(imagemin({
//       	progressive: true
//       }))
//       .pipe(gulp.dest('public/media'));
// });


 gulp.task('convert', function(){
 	gulp.src('raw/builder/html/*.html')
 		.pipe(html2jade())
		.pipe(notify('Шаблоны .jade обновлены'))
 		.pipe(gulp.dest('raw/builder/jade'));
 });


gulp.task('watch', function() {
   gulp.watch(['app/scss/*.scss', 'app/scss/*/*.scss', 'app/templates/*.jade', 'app/templates/*/*.jade'], ['default']);
});

// other auxiliary tasks
// gulp.task('fonts', function(){
// 	gulp.src("src/icons/*.svg")
// 	.pipe(iconfont({
// 	  fontName: 'IconCustom',
// 	  appendCodepoints: true  
// 	}))
// 	.on('codepoints', function(codepoints, options){
// 		console.log(codepoints, options);
// 	})
// 	.pipe(gulp.dest("public/fonts/iconcustom"))
// });

// default task
gulp.task('default', ['webserver', 'scss', 'template', 'watch']);


// other tasks
gulp.task('update', ['default', 'image', 'fonts']);
