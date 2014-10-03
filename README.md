# grunt-eson

> Generates JSON configuration files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-eson --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-eson');
```

## The "eson" task

### Overview
In your project's Gruntfile, add a section named `eson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  eson: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.beautify
Type: `Mixed`
Default value: `false`

Value passed to the `JSON.stringify` as a third parameter.

#### options.replace
Type: `Object`
Default value:
```js
{
  '{root}': process.cwd()
}
```

Object with replace options, used with `eson.replace` object. With default value `eson` uses `eson.resplace('{root}', process.cwd())`.

#### options.env
Type: `Array`
Default value: `[]`

Array of env variables which may alter `eson` configuration. See [`eson.env`](https://github.com/visionmedia/eson#esonenvprefix) documentation for details.

#### options.args

Type: `Array`
Default value: `[]`

Array of command line arguments which may alter `eson` configuration. See [`eson.args`](https://github.com/visionmedia/eson#esonargsargs) documentation for details.

### Usage Examples

In this example Grunt will generate one file `dest/config.json` which will consist of `src/config/accounts.json` file and all JSON files from `src/config/database` directory. In newly generated file each JSON object will be stored under key created from the file name. In the eand JSON will be parsed by ESON and saved as `dest/config.json`. File will be formated (beautified) with 2 spaces as an indent character.

```js
grunt.initConfig({
  eson: {
    options: {
      beautify: 2
    },
    files: {
      'dest/config.json': ['src/config/database/*.json', 'src/config/accounts.json'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Known issues

- If JSON is generated from many files with the same name only content from the last one will be used.

## Release History
_(Nothing yet)_
