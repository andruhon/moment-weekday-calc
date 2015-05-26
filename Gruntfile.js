module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */',
        sourceMap: true
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*_test.js']
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js','test/*.js'],
        tasks: ['mochaTest', 'uglify'],
        options: {
          spawn: true
        }
      }
    }
  });

  //plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['mochaTest', 'uglify']);

};