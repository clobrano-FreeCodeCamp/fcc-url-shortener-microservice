// This route will save the given url into the database
// returning its "shorter" version
var router = require('express').Router();

router.get('/:url', function(req, res) {
    var json = {};
    json.original = req.params.url;
    json.shorter = getShortUrl(req, random());
  res.send(json);
});


var isValidURL = function () {
    // TODO
    return false;
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
