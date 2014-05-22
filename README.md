Publisher project js part
=========================


Publisher-side implementation
-----------------------------

- Prepare the webpage.
Doctors' availabilities will be injected into tag contents, which have 'availability' class and data-doxter-id attribute. Example HTML tag would be

```
<div class="availability" data-doxter-id="12345"></div>
```

Note that at current protototype stage, doxter id can be arbitrary.


- Insert the script between `<head>` and `</head>`

```
<script id="doxter-publisher-js" data-publisher-key="xxxx" src="http://blog.doxter.de/publishers.js/doxter-publisher-0.0.1.min.js"></script>
```

- Templating

Handlebars syntax is available. http://handlebarsjs.com/

If not specified, default template will be used. Default template is equivalent to:

    {{#each availability}}
    <div class="availability-entry">
        <div class="problem">{{problem}}</div>
        {{#each times}}
            <div class="time">{{day}} {{start}}
                <a class="btn" href="{{url}}">Buchen</a>
            </div> {{/each}} </div>
    {{/each}}

In order to customise the view, create a template file and specify the file name at the loading. For instance, a patrial HTML like follows can reside as template.html

```
<script id="doxter-publisher-js" data-publisher-key="xxxx" data-template-url="template.html" src="http://blog.doxter.de/publishers.js/doxter-publisher-0.0.1.min.js"></script>
```

    {{#each availability}}
        <span class="problem">{{problem}}</span>

        {{#each times}}
        <a href='{{url}}'>{{start}} - {{end}}</span>
       {{/each}}
    {{/each}}

Following data is exposed.

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
