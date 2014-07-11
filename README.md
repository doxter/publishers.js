# Doxter downloader plugin for publishers

## Getting Started for Publishers
1) Publisher must include script like this way
```
<script type="application/javascript" id="doxterPublisherDownloader" async data-aid="custom_aid" src="http://js.doxter.de/doxter_publisher.min.js"></script>

```
2) Publisher must add this tag for sinchronize in his body tag
```

...
<div id="doxter_content" data-doxter-id="test_id_3"/>
```


## Getting Started for Grunt
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install the project's dependencies

```bash
sudo apt-get install nvm
nvm ls-remote , install the last version
nvm install "version"
nvm use "version"
npm install
```

Once that's done, you can run the jasmine unit tests via

```js
grunt jasmine
```

```js
grunt jasmine
```

```build mini version
grunt build
```

`package.json` allows you to define the script to execute when you run 'npm test'

`grunt test` is registered to run `['jasmine']` to thoroughly test your code.

```js
grunt.registerTask('test', ['jshint', 'jasmine']);
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


FOR PUBLISHERS
<script src="http://doxter.de/doxter_publisher.min.js" async="async" type="text/javascript"></script>

## Release History

 * 2014-18-06 - v0.0.1 - Initial release

