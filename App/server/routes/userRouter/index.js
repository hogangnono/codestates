const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.signup);
router.post('/load', controller.load);
router.post('/save', controller.save);
router.post('/deleteAll', controller.deleteAll);

module.exports = router;
