module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/styles.css": "css/styles.less" // destination file and source file
        }
      }
    },
   watch: {
      styles: {
        files: 'css/styles.less',
        tasks: ['less']
      }
    },
    browserSync:{
    	dev:{
    		bsFiles: {
    			src: ['css/*.css','*.html','js/*.js']
    		}
    	},
    	option: {
    		watchTask: true,
    		server: {
    			baseDir: './'

    		}
    	}
    }
    
  });

  grunt.registerTask('compile', ['less']);
  grunt.registerTask('default', ['browserSync','watch']);
};