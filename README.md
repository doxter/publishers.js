Publisher project js part
=========================


Publisher-side implementation
-----------------------------

- Prepare the webpage.
Doctors' availabilities will be injected into tag contents, which have 'doctor' class and data-doctor-id attribute. Example HTML tag would be

>> <div class="doctor" data-doctor-id="12345"></div>

- Create a template and store somewhere

For instance, a patrial HTML like follows can reside as template.html

    <div>
        {{#each availability}}
            <span class="problem">{{problem}}</span>

            {{#each times}}
            <a href='{{url}}'>{{start}} - {{end}}</span>
           {{/each}}
        {{/each}}
    </div>


- Require dependencies
    - jQuery > 1.5
    - Handlebars

- Insert the script (should be after dependencies)
`<script publisher.js></script>

- Run the script (after the script require tag)
`<script>doxter.publisher.load({ accountKey: 'xxxx', templateUrl: 'template/template.html'});</script>`

Template can use Handlebars syntax: http://handlebarsjs.com/. For each doctor, exposed are

    availability: [
        {
            problem: String,
            times: [
                date: String,
                start: String,
                end: String
            ]
        }
    ]



Contribution
------------

- Get the code
- Install tools
    - npm
    - nodejs-legacy
- Recommended local settings
    - `% npm config set prefix ~/.npm`
    - `% export PATH=~/.npm/bin`
    - `% export NODEPATH=~/.npm/lib/node_modules`
