// This route will save the given url into the database
// returning its "shorter" version
var router = require('express').Router();
var isValid = require('valid-url').isWebUri;

router.get('/http://:url', function(req, res) {
    var json = {};
    json.original = 'http://' + req.params.url;
    json.shorter = getShortUrl(req, random()); + req.originalUrl
    res.send(json);
});

router.get('/https://:url', function(req, res) {
    var json = {};
    json.original = 'https://' + req.params.url;
    json.shorter = getShortUrl(req, random()); + req.originalUrl
    res.send(json);
});

var getShortUrl = function (req, id) {
    var baseUrl = req.protocol + '://' + req.get('host') + '/';
    return baseUrl + id;
}

var random = function() {
    // Let the IDs be numbers with up to 5 digits
    return Math.ceil(Math.random() * 100000);
}

module.exports = router;
