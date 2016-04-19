# grunt-git-changelog-generator

> Generate markdown changelogs from git log messages and tags

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-changelog-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-changelog-generator');
```

## The "git_changelog_generator" task

### Overview
In your project's Gruntfile, add a section named `git_changelog_generator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  git_changelog_generator: {
    options: {
      // Task-specific options go here.
      repo: 'https://github.com/opentable/grunt-git-changelog-generator',
      changelog: './CHANGELOG.md'
    }
  },
});
```

### Options

#### options.repo
Type: `String`
Default value: none

A string value that is used to do add links pointing to the specific PR related in the repo, it should be the URL of the live repo.

#### options.changelog
Type: `String`
Default value: `'./CHANGELOG.md'`

A string value that is used to write the path/file with the changelog content. By default the plugin will generate and write to `./CHANGELOG.md`
