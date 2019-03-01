var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.send('this is a search page');
});

module.exports = router;
