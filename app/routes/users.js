var express = require('express');
var router = express.Router();
var User = require('../models/users');
/* GET users listing. */

router.post('/', async (req, res) => {
    try {
        await User.create({
            name: req.body.name
        });
        res.status(200).send('성공');
    } catch (err) {
        res.status(500).send('fail');
    }
});

router.get('/', (req, res) => {
    res.send('aaaaaa');
});

module.exports = router;
