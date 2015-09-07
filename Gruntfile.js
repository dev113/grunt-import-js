/*
 * grunt-import-js
 * https://github.com/dev113/grunt-import-js
 *
 * Copyright (c) 2015 Robbie Robke
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        import_js: {
            files: {
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['import_js']);

};
