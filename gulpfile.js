var gulp = require('gulp');
var less = require('gulp-less'); 
var browserSync = require('browser-sync');
 
 
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




