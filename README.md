publisher.js
============

publisher.js lets you integrate doctors' availabilities information from doxter.de on your own website. The plugin fetches updated times for different medical issues via the doxter Availabilities API.

Getting started
---------------

Insert an HTML tag where you want to display doctors' availabilities. The HTML tag must contain the 'availability' class and the 'data-doxter-id' attribute. The tag can be any valid HTML tag, e.g. `<span>`, `<p>` or `<div>`:

```
<div class="availability" data-doxter-id="example-id"></div>
```

(For prototyping the data-doxter-id can be arbitrary.)

Insert the following script tag between the `<head>` and `</head>` tags.

```
<script id="doxter-publisher-js" data-publisher-key="example-publisher-key" src="http://blog.doxter.de/publishers.js/doxter-publisher-0.0.2.min.js"></script>
```

Each client will have a unique publisher key provided by doxter. To obtain your publisher key, log into the doxter publisher administration website. (Currently doxter is preparing the administration interface.)


Templating
----------
The [Handlebars library](http://handlebarsjs.com/) is used for templating.

If you do not specify your own template for displaying doctors' availabilities, the following default template will be used:

    {{#each availability}}
    <div class="doxter-availability-entry">
        <div class="doxter-problem">{{problem}}</div>
        {{#each times}}
            <div class="doxter-time">{{day}} {{start}}
                <a class="doxter-btn" href="{{url}}">Buchen</a>
            </div> {{/each}} </div>
    {{/each}}

In order to customise the view, create a template file and specify the file name. For instance, create a partial HTML file with the following contents and name it template.html.

    {{#each availability}}
        <span class="problem">{{problem}}</span>

        {{#each times}}
        <a href='{{url}}'>{{start}} - {{end}}</span>
       {{/each}}
    {{/each}}

The location of the template file needs to be specified in the script tag which refers to the publisher.js javascript file:
`
```
<script id="doxter-publisher-js" data-publisher-key="example-publisher-key" data-template-url="template.html" src="http://blog.doxter.de/publishers.js/doxter-publisher-0.0.2.min.js"></script>
```

Make sure that the file can be accessed by the Ajax (XMLHTTP) Request.

To check all the available templating syntaxes, visit [Handlebars' website](http://handlebarsjs.com/).


In the template, the following data for each doctor's availability is accessible. (Since we are still on a prototype stage, the data structure is likely to change.)

    {
        availability: [
            {
                problem: String,
                times: [
                    {
                        date: String,
                        day: String,
                        start: String,
                        end: String,
                        url: String
                    }
                ]
            }
        ]
    }



Contribution
------------

- Get the code
- Install tools
    - npm
    - nodejs-legacy
- Install npm packages locally
    - `% npm install`
- Recommended local settings
    - `% npm config set prefix ~/.npm`
    - `% export PATH=~/.npm/bin`
    - `% export NODEPATH=~/.npm/lib/node_modules`
