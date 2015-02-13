# For Publishers

The doxter javascript plugin enables publishers to pull in doxter directory content and available times.

Requirements are:

 - a valid doxter publisher ID (AID)
 - inclusion of this plugin in the publisher's head tag
 - customized markup snippet on doxter side
 - container elements with a valid `doxter-id` in the body tag
 

### Plugin inclusion

To install the plugin the following line needs to be inserted within the HEAD tag of the page:

```HTML
<script type="application/javascript" id="doxterPublisherDownloader" async data-aid="VALID_PUBLISHER_ID" src="http://js.doxter.de/doxter_publisher.min.js"></script>
```

The `VALID_PUBLISHER_ID` needs to be replaced by the actual publisher id that is issued by doxter.


### customized markup snippet

The snippet allows gives the publisher total control of the HTML layout that this plugin inserts. The template language usedis [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers).

At the moment the only object available is `time_url` that will be replaced by the link to the doxter profile with publisher's AID.

```HTML
<div class='doxter entry'>
<a href="{{ time_url }}" target="_blank">Termin online vereinbaren bei doxter.de</a>
</div>
```

A future version will make the availabilities accessible within the template:


```HTML
<div class='doxter availabilities'>
<ul>
  {% for time in times %}
  <li class='time'>
    <a href="{{ time.booking_url }}" target="_blank">{{ time.starts_at | date: "%Y%m%d %H%:M" } }} {{ time.reasons }}</a> 
  </li>
  {% endfor %}
</ul>
</div>
```

### Tagged container elements

A tagged container element is a DIV-Tag that will be filled with the HTML fragment from the doxter doctor identified by the `data-doxter-id`.

```HTML
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

