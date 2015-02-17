# doxter/publishers.js

The doxter javascript plugin enables publishers to pull in doxter directory content and available times.

Requirements are:

 - a valid doxter publisher ID (AID)
 - inclusion of this plugin in the publisher's head tag
 - customized markup snippet on doxter side
 - container elements with a valid `doxter-id` in the body tag

## Usage 

### Plugin inclusion

To install the plugin the following line needs to be inserted within the HEAD tag of the page:

```HTML
<script type="application/javascript" id="doxterPublisherDownloader" async data-aid="VALID_PUBLISHER_ID" src="http://js.doxter.de/doxter_publisher.min.js"></script>
```

The `VALID_PUBLISHER_ID` needs to be replaced by the actual publisher id that is issued by doxter.


### Customized markup snippet

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

A tagged container element is a DIV-Tag that will be filled with the HTML fragment from the doxter doctor identified by the `data-doxter-id` (in this case from doctor Mustermann).

```HTML
<div id="doxter_content" data-doxter-id="4d7dfd0d768e714f2b000005"/>
```

## Fallback

The doxter content that the javascript plugin inserts is always loaded asynchronously so that the publisher site will always work. To always have a fallback when the dynamic content should does not work the container element may be prefilled with the profile link:

```HTML
<div id="doxter_content" data-doxter-id="4d7dfd0d768e714f2b000005">
  <a href="http://www.doxter.de/doctors/4d7dfd0d768e714f2b000005" target="_blank">Termin online vereinbaren bei doxter.de</a>
</div>
```



