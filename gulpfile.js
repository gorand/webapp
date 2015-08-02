var gulp = require('gulp'),
	jade = require('gulp-jade'),
	postcss = require('gulp-postcss'),
	precss = require('precss'),
	colorFunction = require("postcss-color-function"),	
	webserver = require('gulp-webserver'),
 	mainBowerFiles = require('main-bower-files'),
 	iconfont = require('gulp-iconfont'),
	notify = require('gulp-notify');

// runing a webserver
gulp.task('webserver', function(){
	gulp.src('dist')
		.pipe(webserver({
			port: 8080,
			livereload: true,
      		open: true
		})
	);
});

// convert from Jade to HTML
gulp.task('template', function(){
	gulp.src('app/templates/pages/*.jade')
		.pipe(jade({
			pretty: true
		}))	
		.pipe(gulp.dest('dist'))
});

// convert from PostCSS to CSS
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

// main bower files
gulp.task('fontsMainBower', function() {
	return gulp.src(mainBowerFiles(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.otf']))
	    .pipe(gulp.dest('dist/fonts/vendor'))
});
gulp.task('cssMainBower', function() {
	return gulp.src(mainBowerFiles('**/*.css'))
	    .pipe(gulp.dest('app/css/vendor'))
});
gulp.task('jsMainBower', function() {
	return gulp.src(mainBowerFiles('**/*.js'))
	    .pipe(gulp.dest('dist/js/vendor'))
});
gulp.task('allMainBower',['fontsMainBower', 'cssMainBower', 'jsMainBower']);

// image optimization
gulp.task('image', function() {
     gulp.src('dist/img/*')
       .pipe(gulp.dest('raw/images'))
       .pipe(imagemin({
       		progressive: true,
       		use: [pngquant()]
       }))
       .pipe(gulp.dest('dist/img'));
 });

// convert from HTML to Jade
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
gulp.task('update', [ 'mainBower', 'postcss', 'template', 'fonts']);
