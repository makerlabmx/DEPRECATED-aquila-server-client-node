'use strict';
 
module.exports = function(grunt) {
 
  // configure grunt
  grunt.initConfig({
 
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        '**/*.js',
        '!node_modules/**/*',
        '!public/js/**/*',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    browserify: {
      standalone: {
        src: [ './src/aquilaClient.js' ],
        dest: './public/js/aquilaClient.standalone.js',
        options: {
          bundleOptions: {
            standalone: 'aquilaClient'
          }
        }
      },
    },
 
  });
 
  // Load plug-ins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
 
  // define tasks
  grunt.registerTask('default', [
    'jshint',
    'browserify',
  ]);
};