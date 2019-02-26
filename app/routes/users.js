var express = require('express');
var router = express.Router();
var User = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('this is users page');
});

router.post('/', function(req, res) {
    User.create(
        {
            Id: req.body.id,
            drawingSetNumber: req.body.drawingSetNumber,
            shapeType: req.body.shapeType,
            shapePath: req.body.shapePath,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            description: req.body.description,
            priority: req.body.priority,
            borderWidth: req.body.borderWidth,
            borderColor: req.body.borderColor,
            innerColor: req.body.innerColor,
            usersId: req.body.userId,
            factorCategoriesId: req.body.factorCategoriesId
        },
        function(err, user) {
            if (err) return res.status(500).send('User 생성 실패.');
            res.status(200).send(user);
        }
    );
});

module.exports = router;
