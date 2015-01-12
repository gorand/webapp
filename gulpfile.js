var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	html2jade = require('gulp-html2jade'),
	iconfont = require('gulp-iconfont'),
	notify = require('gulp-notify');


gulp.task('template', function(){
	gulp.src('src/template/*.jade')
		.pipe(jade({
			pretty: true
		}))	
		.pipe(gulp.dest('public'))
});

gulp.task('default', ['template'],  function() {
    gulp.src(['src/scss/main.scss'])
		.pipe(sass())
		.pipe(notify('Файлы успешно обновлены!'))
		.pipe(gulp.dest('public/css/'));
});

gulp.task('image', function() {
    gulp.src('src/img/*')
      .pipe(imagemin({
      	progressive: true
      }))
      .pipe(gulp.dest('public/img'));
});

gulp.task('media', function() {
    gulp.src('src/content/*')
      .pipe(imagemin({
      	progressive: true
      }))
      .pipe(gulp.dest('public/media'));
});

gulp.task('watch', function() {
   gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss', 'src/template/*.jade', 'src/template/includes/*.jade'], ['default']);
});


// other auxiliary tasks
gulp.task('fonts', function(){
	gulp.src("src/icons/*.svg")
	.pipe(iconfont({
	  fontName: 'IconCustom',
	  appendCodepoints: true  
	}))
	.on('codepoints', function(codepoints, options){
		console.log(codepoints, options);
	})
	.pipe(gulp.dest("public/fonts/iconcustom"))
});

gulp.task('html2jade', function(){
	gulp.src('index.html')
		.pipe(html2jade())
		.pipe(gulp.dest('src'));
});

// all tasks
gulp.task('update', ['default', 'image', 'fonts']);
