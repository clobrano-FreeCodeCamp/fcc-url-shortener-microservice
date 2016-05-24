var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {
    res.writeHead(301,
                  {Location: 'http://www.google.it'});
    res.end();
});

module.exports = router;
