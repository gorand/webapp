var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	html2jade = require('gulp-html2jade'),
	webserver = require('gulp-webserver'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	iconfont = require('gulp-iconfont'),
	notify = require('gulp-notify');


gulp.task('webserver', function(){
	gulp.src('dist')
		.pipe(webserver({
			port: 8080,
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

 gulp.task('image', function() {
     gulp.src('dist/img/*')
       .pipe(gulp.dest('raw/images'))
       .pipe(imagemin({
       		progressive: true,
       		use: [pngquant()]
       }))
       .pipe(gulp.dest('dist/img'));
 });


 gulp.task('convert', function(){
 	gulp.src('raw/builder/html/*.html')
 		.pipe(html2jade())
		.pipe(notify('Шаблоны .jade обновлены'))
 		.pipe(gulp.dest('raw/builder/jade'));
 });


gulp.task('watch', function() {
   gulp.watch(['app/scss/*.scss', 'app/scss/*/*.scss', 'app/templates/*.jade', 'app/templates/*/*.jade'], ['scss', 'template']);
});

// other auxiliary tasks
 gulp.task('fonts', function(){
 	gulp.src("app/icons/*.svg")
 	.pipe(iconfont({
 	  fontName: 'iconproject',
 	  appendCodepoints: true  
 	}))
 	.on('codepoints', function(codepoints, options){
 		console.log(codepoints, options);
 	})
 	.pipe(gulp.dest("dist/fonts/iconproject"))
 });

// include fonts
gulp.task('tofonts1', function(){
 	gulp.src("bower_components/fontawesome/fonts/*")
 	.pipe(gulp.dest("dist/fonts/fontawesome"))
 });
gulp.task('tofonts2', function(){
 	gulp.src("bower_components/roboto-fontface/fonts/*")
 	.pipe(gulp.dest("dist/fonts/roboto-fontface"))
 });

// default task
gulp.task('default', ['webserver', 'scss', 'template', 'watch']);

// other tasks
gulp.task('update', ['scss', 'template', 'image', 'fonts']);
