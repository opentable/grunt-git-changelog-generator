/*
 * grunt-git-changelog-generator
 * https://github.com/opentable/grunt-git-changelog-generator
 *
 * Copyright (c) 2016
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    // Configuration to be run (and then tested).
    git_changelog_generator: {
      options: {
        repo: 'https://github.com/opentable/grunt-git-changelog-generator'
      },
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'git_changelog_generator']);

};
