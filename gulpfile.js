var gulp = require('gulp'),
	jade = require('gulp-jade'),
	postcss = require('gulp-postcss'),
	precss = require('precss'),
	colorFunction = require("postcss-color-function"),	
	webserver = require('gulp-webserver'),
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

gulp.task('postcss',  function() {
	var processors = [
			precss,
			colorFunction
		];
    return gulp.src(['app/css/main.css'])
		.pipe(postcss(processors))
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
   gulp.watch(['app/css/*.css', 'app/css/*/*.css', 'app/templates/*.jade', 'app/templates/*/*.jade'], ['postcss', 'template']);
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
gulp.task('default', ['webserver', 'postcss', 'template', 'watch']);

// other tasks
gulp.task('update', ['postcss', 'template', 'image', 'fonts']);
