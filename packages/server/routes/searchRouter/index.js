var router = require('express').Router();
var controller = require('./controller');

router.post('/', controller.nearbylist);

module.exports = router;
