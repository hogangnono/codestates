var router = require('express').Router();
var controller = require('./controller');

router.get('/', controller.indexPage);

module.exports = router;
