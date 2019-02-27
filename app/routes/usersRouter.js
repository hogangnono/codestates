var express = require('express');
var router = express.Router();
var User = require('../models').users;
var Drawings = require('../models').drawings;
var FactorCategories = require('../models').factorCategories;
var Figures = require('../models').figures;
/* GET users listing. */

router.post('/', async (req, res) => {
    const { name } = req.body;
    User
        .findOrCreate({ where: { name: name } })
        .spread((user, created) => {
            if (created) {
                console.log('========= RESULT ===========');
                console.log('POST /users/ :: DB에 없는 데이터여서 저장했습니다.');
                console.log('============================');
                res.status(201).send('DB에 없는 데이터여서 저장했습니다.');
            } else {
                console.log('========= RESULT ===========');
                console.log('POST /users/ :: user information :\n', user.dataValues);
                console.log('============================');
                res.status(200).send('DB에 이미 있는 데이터입니다. 로그인만 했습니다.');
            }
        })
        .catch(err => {
            console.log('========= RESULT ===========');
            console.log('POST /users/ :: request was failed beacuse : ', err);
            console.log('============================');
            res.status(500).send('POST /users/ request was failed');
        });
});

router.post('/drawings', async (req, res) => {
    console.log(req.body);
    try {
        await Drawings.create({
            // drawingSetNumber: req.body.drawingSetNumber,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            usersId: req.body.usersId,
            figuresId: req.body.figuresId
        });
        res.status(200).send('성공');
    } catch (err) {
        console.log('err msg: ', err);
        res.status(500).send('fail');
    }
});

router.post('/factorCategories', async (req, res) => {
    console.log(req.body);
    try {
        await FactorCategories.create({
            name: req.body.name
        });
        res.status(200).send('성공');
    } catch (err) {
        res.status(500).send('fail');
    }
});

router.post('/figures', async (req, res) => {
    console.log(req.body);
    try {
        await Figures.create({
            shapeType: req.body.shapeType,
            shapePath: req.body.shapePath,
            description: req.body.description,
            priority: req.body.priority,
            borderWidth: req.body.borderWidth,
            borderColor: req.body.borderColor,
            innerColor: req.body.innerColor,
            factorCategoriesId: req.body.factorCategoriesId
        });
        res.status(200).send('성공');
    } catch (err) {
        res.status(500).send('fail');
    }
});
module.exports = router;
