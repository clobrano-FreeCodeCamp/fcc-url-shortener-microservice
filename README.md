# URL shortner APP

URL shortener microservice for the Free Code Camp challenge

Here are the specific user stories you should implement for this project:

* User Story:  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
* User Story: When I visit that shortened URL, it will redirect me to my original link.

From the example:

Example creation usage:

    https://.../api/new/https://www.google.com
    https://.../api/new/http://foo.com:80

Example creation output

    { "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }

Usage:

    https://little-url.herokuapp.com/2871

Will redirect to:

    https://www.google.com/



A live demo of this APP is on [Heroku](https://trackurl.herokuapp.com/)
