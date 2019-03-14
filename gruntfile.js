module.exports = function(grunt) {

  require('jit-grunt')(grunt,{
  	useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/styles.css":"css/styles.less" // destination file and source file
        }
      }
    },
   watch: {
      styles: {
        files: "css/styles.less",
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
    },
    copy: {
    	html: {
    		files: [{
    			expand: true,
    			dot: true,
    			cwd: './',
    			src: ['*.html'],
    			dest: 'dist'
    		}]
    	},
    	fonts: {
    		files: [{
    			expand: true,
    			dot: true,
    			cwd: 'node_modules/font-awesome',
    			src: ['fonts/*.*'],
    			dest: 'dist'
    		}]
    	}

    }, 
    clean: {
    		build: {
    		src: ['dist/']
    		}
    },
    imagemin: {
    	dynamic: {
    		expand: true,
    		dot: true,
    		cwd: './',
    		src: ['img/*.{png,jpg,gif}'],
    		dest: 'dist/'

    	}
    },
    useminPrepare: {
    	foo: {
    		dest: 'dist',
    		src: ['index.html','second.html']
    	},
    	options: {
    		flow: {
    			steps: {
    				css:['cssmin'],
    				js:['uglify'],
    			},
    			post: {
    				css: [{
    					name: 'cssmin',
    					createConfig: function (context, block){
    						var generated = context.options.generated;
    						generated.options = {
    							keepSpecialComments: 0, rebase: false
    						};
    					}
    				}]
    			}
    		}
    	}
    },
    concat: {
    	options: {
    		separator: ';'
    	},
    	dist: {}
    },
    uglify: {
    	dist: {}
    },
    cssmin: {
    	dist:{}
    },
    filerev: {
    	options: {
    		encoding: 'utf8',
    		algorithm: 'md5',
    		length: 20
    	},
    	release: {
    		src: ['dist/js/*.js','dist/css/*.css']
    	}
    },
    usemin: {
    	html:['dist/index.html','dist/second.html'],
    	options: {
    		assetsDirs: ['dist','dist/css','dist/js']
    	}
    },
    htmlmin: {
    	dist: {
    		options:{
    			collapseWhitespace: true
    		},
    		files:{
    			'dist/index.html':'dist/index.html'
    		}
    	}
    }
    
  });

  grunt.registerTask('compile', ['less']);
  grunt.registerTask('default', ['watch','browserSync']);
  grunt.registerTask('build', ['clean','copy','imagemin','useminPrepare','concat','cssmin','uglify','filerev','usemin','htmlmin']);
};