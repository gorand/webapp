var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	// imagemin = require('gulp-imagemin'),
	// html2jade = require('gulp-html2jade'),
	// iconfont = require('gulp-iconfont'),
	notify = require('gulp-notify');


gulp.task('template', function(){
	gulp.src('app/templates/pages/*.jade')
		.pipe(jade({
			pretty: true
		}))	
		.pipe(gulp.dest('dist'))
});

gulp.task('default', ['template'],  function() {
    gulp.src(['app/scss/main.scss'])
		.pipe(sass())
		.pipe(notify('Файлы успешно обновлены!'))
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

// gulp.task('html2jade', function(){
// 	gulp.src('index.html')
// 		.pipe(html2jade())
// 		.pipe(gulp.dest('src'));
// });

// all tasks
gulp.task('update', ['default', 'image', 'fonts']);
