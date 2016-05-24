// This route will save the given url into the database
// returning its "shorter" version
var router = require('express').Router();
var isValid = require('valid-url').isWebUri;
var save = require('../database').save;

// Using GET parameters in place of something like "/:url", because
// with this last solution the server is fooled by the "http" in the
// middle of the whole url.
router.get('/', function(req, res) {
    var json = {};
    json.original = req.param('url');

    if (!isValid(json.original)) {
        json.err = 'invalid url';
    } else {
        // Let the IDs be numbers with up to 5 digits
        id = Math.ceil(Math.random() * 100000);
        json.littleurl = req.protocol + '://' + req.get('host') + '/api/go/' + id
        save(id, json.original);
    }

    res.send(json);
});


module.exports = router;

