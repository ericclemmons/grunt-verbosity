# grunt-verbosity
[![Build Status](https://travis-ci.org/ericclemmons/grunt-verbosity.png?branch=master)](https://travis-ci.org/ericclemmons/grunt-verbosity)


> Adjust verbosity for individual grunt tasks

This plugin simply hooks until `grunt.log.writeln` to allow you to cleanup log output.


## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-verbosity --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-verbosity');
```


## The `verbosity` task

### Usage
In your project's Gruntfile, add a section named `verbosity` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  verbosity: {
    // Default
    option1: {
      // options: { mode: 'hidden' },
      tasks: ['copy']
    },

    // Output is rewritten on the line to show progress but save space
    option2: {
      options: { mode: 'oneline' },
      tasks: ['copy:files']
    },

    // Output is normal.  Useful for debugging without commenting out the whole block
    option3: {
      options: { mode: 'normal' },
      tasks: ['copy:something']
    }
  },
})
```


### Options

#### options.mode
Type: `String`
Default value: `normal`

A string value to determine how to modify `grunt.log.writeln` output.

- `hidden` (Default): See the task get executed, but not its output
- `oneline`: See the output overwrite the same line to conserve space
- `normal`: See the output without modification.  Useful for debugging.
- `dot`: See each line of output reduced to a dot to show progress.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History

### v0.2.2

- Fix bug with `verbosity.writeln` and `undefined`

### v0.2.1

- Fix bug with `Verbosity.match` not returning an array

### v0.2.0

- Rewrote to not use `grunt.util.hooker`

### v0.1.2

- Fix BC break with Grunt 0.4.1 - [#3](https://github.com/ericclemmons/grunt-verbosity/pull/3) (Thanks @gruber76!)

### v0.1.1

- Add `dot` mode - [#1](https://github.com/ericclemmons/grunt-verbosity/pull/1) (Thanks @getfatday!)

### v0.1.0

- Initial release
