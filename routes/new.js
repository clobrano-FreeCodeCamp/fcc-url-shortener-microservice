// This route will save the given url into the database
// returning its "shorter" version
var router = require('express').Router();
var validUrl = require('valid-url');

router.get('/:url', function(req, res) {
    var json = {};
    if (!isValidURL(req.params.url)) {
        json.err = 'invalid url';
    } else {
        json.original = req.params.url;
        json.shorter = getShortUrl(req, random());
    }
  res.send(json);
});


var isValidURL = function (suspect) {
    return validUrl.isUri('http://' + suspect);
}

var getShortUrl = function (req, id) {
    var baseUrl = req.protocol + '://' + req.get('host') + '/';
    return baseUrl + id;
}

var random = function() {
    // Let the IDs be numbers with up to 5 digits
    return Math.ceil(Math.random() * 100000);
}

module.exports = router;
