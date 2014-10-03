/*
 * grunt-eson
 * https://github.com/kwiniarski/grunt-eson
 *
 * Copyright (c) 2014 Krzysztof Winiarski
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var eson = require('eson');
var chalk = require('chalk');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('eson', 'Create JSON configuration file using ESON.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      beautify: false,
      replace: {
        '{root}': process.cwd()
      },
      env: [],
      args: []
    });

    var conf = eson();

    // Setup ESON options
    conf.use(eson.ms);
    conf.use(eson.env(options.env));
    conf.use(eson.args(options.args));
    conf.use(eson.glob);
    conf.use(eson.bools);
    conf.use(eson.include);
    conf.use(eson.dimensions);

    for (var search in options.replace) {
      conf.use(eson.replace(search, options.replace[search]));
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(file) {

      var json = {}, data = '';

      // Combine all files into one
      file.src.forEach(function(src){
        var name = path.basename(src, '.json');
        if (name) {
          json[name] = grunt.file.readJSON(src);
        }
      });

      // Parse combined JSON object
      data = conf.parse(JSON.stringify(json));

      // Serialize to string before saving
      data = JSON.stringify(data, null, options.beautify);

      // Add verbose information
      grunt.verbose.writeln('Parsed data: ' + chalk.gray(data));

      // Write the destination file.
      grunt.file.write(file.dest, data);

      // Print a success message.
      grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created.');
    });
  });

};
