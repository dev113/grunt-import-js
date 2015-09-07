/*
 * grunt-import-js
 * https://github.com/dev113/grunt-import-js
 *
 * Copyright (c) 2015 Robbie Robke
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('import_js', 'Copy JS files from src to dest, replacing @import instructions for other JS files by their contents.', function() {
        var count = 0;
        var srcFolder;

        this.files.forEach(function(f) {
            srcFolder = f.orig.cwd;

            var src = f.src.filter(function(filepath) {
                grunt.file.write(f.dest, getReplacedFileContent(filepath));
                count++;
            });
        });

        grunt.log.ok(count + ' files created.');

        function getReplacedFileContent(filepath) {
            var regexImport = /\/\/\s+@import\s*(['"])(.*?\.js)\1\s*;/gi;

            var str = grunt.file.read(filepath);

            return str.replace(regexImport, function(str, p1, p2, offset) {
                return ";\n" + getReplacedFileContent(srcFolder + p2) + "\n";
            });
        }
    });
};
