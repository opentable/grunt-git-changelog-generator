/*
 * grunt-git-changelog-generator
 * https://github.com/opentable/grunt-git-changelog-generator
 *
 * Copyright (c) 2016
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');

module.exports = function(grunt) {

  var get = {
    prs: function(versions, callback, options) {
      grunt.util.spawn({
        cmd: 'git',
        args: ['log', versions]
      }, function(err, res, code) {
        if (err) {
          return callback(err);
        }

        var commits = res.stdout.split('commit ');
        var result = commits.reduce(function(result, commit) {
          var commitMessages = commit.split('pull request');

          if (commitMessages.length > 1) {
            var split = commitMessages[1].split(/#\d+ from/);
            var prNumber = commitMessages[1].split(/from .*/)[0].replace('#','').trim();
            var branchName = split[1].trim().split(' ')[0].trim();
            var commitMessage = split[1].replace(branchName, '').trim();
            commitMessage = commitMessage.length === 0 ? split[1].trim() : commitMessage;
            return result.concat(options.repo ? '- [' + commitMessage + '](' + options.repo + '/pull/' + prNumber + ') ' : '- ' + commitMessage);
          } else {
            return result;
          }
        }, []);

        callback(null, result);
      });
    },
    allPrs: function(tags, callback, options) {
      var results = [];

      var logIntervals = tags.reduceRight(function(logIntervals, interval, i) {
        return i >= 1 ? logIntervals.concat(tags[i - 1] + '..' + interval) : logIntervals.concat(interval);
      }, []);

      async.eachSeries(logIntervals, function(logInterval, next) {
        get.prs(logInterval, function(err, prs) {
          results.push(prs);
          next();
        }, options);
      }, function() {
        callback(null, results);
      });
    },

    tags: function(callback) {
      grunt.util.spawn({
        cmd: 'git',
        args: ['tag']
      }, function(err, result, code) {
        if(err) {
          return callback(err);
        }
        callback(null, result.stdout.split('\n'));
      });
    }
  };

  grunt.registerTask('git_changelog_generator', 'Generate markdown changelog from git log messages and tags', function() {
    var options = this.options({
      changelog: './CHANGELOG.md'
    });

    var done = this.async();
    var result = '## Change Log';

    get.tags(function(err, tags) {
      if (err) {
        return grunt.fatal(err);
      }

      get.allPrs(tags, function(err, changes) {
        if (err) {
          return grunt.fatal(err);
        }

        changes = changes.reverse();
        for (var i = tags.length - 1; i >= 0; i--) {
          var changesForTag = changes[i].join('\n');
          if (changesForTag.trim().length) {
            result += '\n\n### ' + tags[i] + '\n' + changesForTag;
          }
        }
        grunt.file.write(options.changelog, result);
        done();
      }, options);
    });
  });
};
