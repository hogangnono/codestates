var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.send('Welcome to hojae hojae!\nthis is a main(index) page');
});

module.exports = router;
