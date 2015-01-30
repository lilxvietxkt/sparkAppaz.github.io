module.exports = function(grunt) {

  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'out/css/style.css': 'src/css/main.scss'
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'out/js/app.js': [ 'src/js/script.js'],
          'out/js/spark.js': [ 'src/js/spark.js' ]
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ["src/css/*.scss", "src/css/modules/*.scss", "src/css/modules/common/*.scss"],
        tasks: ["sass"],
        options: {
          nospwan: true
        }
      },
      js: {
        files: ["src/js/*.js", "src/js/**/*.js"],
        tasks: ["uglify"],
        options: {
          nospwan: true
        }
      },

      jshint: {
        files: ["src/js/*.js", "src/js/**/*.js"],
        tasks: ["jshint"],
        options: {
          nospwan: true
        }
      }
    },

    develop: {
      server: {
        file: 'server.js'
      }
    },

    jshint: {
      myFiles: ['src/js/*.js', 'src/js/**/*.js']
    },

    exec: {
      run: {
        cmd: 'node server.js'
      },

      test: {
        cmd: 'mocha'
      },

      views: {
        cmd: 'node viewCompiler.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('default', []);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('jsUg', ['uglify']);
  grunt.registerTask('test', ['exec:test']);
  grunt.registerTask('views', ['exec:views']);

  grunt.registerTask('serve', ['sass', 'uglify', 'jshint', 'develop', 'watch']);

};