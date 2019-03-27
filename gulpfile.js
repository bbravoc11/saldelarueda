var gulp = require('gulp'),
	less = require('gulp-less'), 
	browserSync = require('browser-sync'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cleanCss = require('gulp-clean-css'),
	flatmap = require('gulp-flatmap'),
	htmlmin = require('gulp-htmlmin')
	;
 
 
/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./css/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./css'));
}); 
/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./css/*.less' , gulp.series('compile-less'));
});

gulp.task('browser-sync',function(){
	var files = [
		'./*html',
		'./css/*.css',
		'./js/*.js',
		'./img/*{png,jpg,gif}'
	];

	browserSync.init(files, {
		sever: {
			baseDir: './'
		}
	});
});

gulp.task('default',gulp.series('watch-less'), function() {
	gulp.start('browser-sync');
});

gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('copyfonts', async function(){
	return gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
	.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', async function(){
	gulp.src('./img/*.{png,jpg,gif}')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('./dist/img'));
});

gulp.task('usemin', async function() {
  return gulp.src('./*.html')
  .pipe(flatmap(function(stream, file){
      return stream
        .pipe(usemin({
            css: [ cleanCss(), rev() ],
            html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
            js: [ uglify(), rev() ],
            inlinejs: [ uglify() ],
            inlinecss: [ cleanCss(), 'concat' ]
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build',gulp.series('clean','copyfonts','imagemin','usemin'));













