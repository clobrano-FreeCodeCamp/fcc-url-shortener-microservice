# fcc-url-shortener-microservice
URL shortener microservice for the Free Code Camp challenge

Here are the specific user stories you should implement for this project:

* User Story:  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
* User Story: When I visit that shortened URL, it will redirect me to my original link.

From the example:

Example creation usage:

    https://little-url.herokuapp.com/new/https://www.google.com
    https://little-url.herokuapp.com/new/http://foo.com:80

Example creation output

    { "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }

Usage:

    https://little-url.herokuapp.com/2871

Will redirect to:

    https://www.google.com/

## Development notes

Using a docker image to run mongodb. Inspecting the image in order to get the IP address (port is default 27017)

$ docker inspect url-shortener | grep -i ipaddress
        "IPAddress": "172.17.0.4",


First user story:
* random ID for the url
* json object with {url:..., ID:...} or {original:..., short:...}
* insert the json object into the MongoDB database
* return the json object to the user

Second user story:
* url checker (regex module?)

Third user story:
* find original url given the ID
* redirect to the original url OR return error if no match was found

