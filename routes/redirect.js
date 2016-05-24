var express = require('express');
var loadUrl = require('../database').load
var router = express.Router();

router.get('/:id', function(req, res) {
    loadUrl(req.params.id, function(data) {
        if (data) {
            res.writeHead(301, {Location: data.original});
            res.end();
        } else {
            res.send('Could not find short url for ID: ' + req.params.id);
        }
    });
});

module.exports = router;
