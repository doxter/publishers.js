# For Publishers

The doxter javascript plugin enables publishers to pull in doxter directory content and available times.

Requirements are:

 - a valid doxter publisher ID (AID)
 - a customized HTML template on doxter
 - inclusion of this plugin in the publisher's <HEAD> tag
 - container elements with valid `doxter-ids` within the <BODY> tag

### Plugin inclusion

To install the plugin the following line needs to be inserted within the HEAD tag of the page:

```
<script type="application/javascript" id="doxterPublisherDownloader" async data-aid="VALID_PUBLISHER_ID" src="http://js.doxter.de/doxter_publisher.min.js"></script>
```

The `VALID_PUBLISHER_ID` needs to be replaced by the actual publisher id that is issued by doxter.


### Tagged container elements

A tagged container element is a DIV-Tag that will be filled with the HTML fragment from the doxter doctor identified by the `data-doxter-id`.

```
<div id="doxter_content" data-doxter-id="test_id_3"/>
```

# For Developers

## Grunt

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

