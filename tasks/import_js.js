/*
 * grunt-import-js
 * https://github.com/dev113/grunt-import-js
 *
 * Copyright (c) 2015 Robbie Robke
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('import_js', 'Import JS files within JS files by @import instruction.', function() {
        var count = 0;

        if (this.files.length > 0) {

            var options = this.options({
                importDir: this.files[0].orig.cwd
            });

            this.files.forEach(function (file) {
                file.src.map(function (filepath) {
                    grunt.file.write(file.dest, getReplacedFileContent(filepath));
                    count++;
                });
            });

            grunt.log.ok(count + ' files created.');
        }

        function getReplacedFileContent(filepath) {
            if (!grunt.file.exists(filepath)) {
                grunt.log.error(grunt.log.wordlist(['@import file not found: ', filepath], {separator: '', color: 'red'}));
                return '';
            } else {
	            var regexImport = /(?:\/\/)?\s*@import\s*(['"])(.*?\.js)\1\s*;/gi;

                var str = grunt.file.read(filepath);

                return str.replace(regexImport, function (str, p1, p2, offset) {
                    return "\n" + getReplacedFileContent(options.importDir + p2) + "\n";
                });
            }
        }
    });
};
