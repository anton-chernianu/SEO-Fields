var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'), 
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'), 
    pug = require('gulp-pug'), 
    browserSync  = require('browser-sync'),

    concat = require('gulp-concat'),
    minifyJS = require('gulp-minify'),

    uglify = require('gulp-uglifyjs'),
    cssmin = require('gulp-cssmin'),
    htmlmin = require('gulp-htmlmin'),

    rename = require('gulp-rename')
    ; 

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'src' 
		},
		notify: false 
	});
});

gulp.task('pug', function() {
  return gulp.src('src/pug/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('src'));
});


gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('build', ['clean', 'sass'], function() {

	var buildCss = gulp.src('src/css/**/*') 
	.pipe(gulp.dest('build/css'))

	var buildFonts = gulp.src('src/fonts/**/*') 
	.pipe(gulp.dest('build/fonts'))

	var buildJs = gulp.src('src/js/**/*') 
	.pipe(gulp.dest('build/js'))

	var buildHtml = gulp.src('src/*.html') 
	.pipe(gulp.dest('build'));

	var buildHtml = gulp.src('src/images/**/*') 
	.pipe(gulp.dest('build/images'));

});

gulp.task('con-css', function() {
  return gulp.src([
  	// './src/css/test.css',
  	'./src/css/main.css'
  	 ])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('con-js', function() {
  return gulp.src([
    // './src/js/test.js',
  	'./src/js/main.js'
  	 ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('compress-js', function () {
  gulp.src('dist/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('compress-css', function () {
    gulp.src('dist/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('htmlmin', function() {
  return gulp.src('build/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('min'));
});

// gulp.task('compress', ['clean-min','con-css','con-js'], function() {
// console.log('finish');
// });

// gulp.task('minify', ['compress-js', 'compress-css'], function() {
// console.log('finish');
// });

gulp.task('chrome-sass', function () {
  return gulp.src('./chrome/css/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./chrome/css/'));
});

gulp.task('chrome-pug', function() {
  return gulp.src('chrome/pug/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('chrome'));
});

gulp.task('clean', function() {
	return del.sync('build'); 
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/sass/**/*.scss', ['sass']); 
  gulp.watch('src/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch('src/css/**/*.css', browserSync.reload);
  gulp.watch('src/pug/**/*.pug', ['pug']); 
  // Chrome
  gulp.watch('chrome/css/**/*.scss', ['chrome-sass']); 
  gulp.watch('chrome/pug/**/*.pug', ['chrome-pug']);
  gulp.watch('chrome/*.html', browserSync.reload); 
  gulp.watch('chrome/js/**/*.js', browserSync.reload);
  gulp.watch('chrome/css/**/*.css', browserSync.reload);
});

gulp.task('default', ['watch']);