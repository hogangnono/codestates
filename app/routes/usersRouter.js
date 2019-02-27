var express = require('express');
var router = express.Router();
var User = require('../models').users;
var Drawings = require('../models').drawings;
var FactorCategories = require('../models').factorCategories;
var Figures = require('../models').figures;

router.post('/', (req, res) => {
    const { name } = req.body;
    User.findOrCreate({ where: { name: name } })
        .spread((user, created) => {
            if (created) {
                console.log('========= RESULT ===========');
                console.log(
                    'POST /users/ :: DB에 없는 데이터여서 저장했습니다.'
                );
                console.log('============================');
                res.status(201).send('DB에 없는 데이터여서 저장했습니다.');
            } else {
                console.log('========= RESULT ===========');
                console.log(
                    'POST /users/ :: user information :\n',
                    user.dataValues
                );
                console.log('============================');
                res.status(200).send(
                    'DB에 이미 있는 데이터입니다. 로그인만 했습니다.'
                );
            }
        })
        .catch(err => {
            console.log('========= RESULT ===========');
            console.log('POST /users/ :: request was failed beacuse : ', err);
            console.log('============================');
            res.status(500).send('POST /users/ request was failed');
        });
});

router.get('/load', async (req, res) => {
    try {
        const user = await User.findAll();
        const drawings = await Drawings.findAll();
        const factorCategories = await FactorCategories.findAll();
        const figures = await Figures.findAll();
        const data = [user, drawings, factorCategories, figures];
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send('User 전체 조회 실패.');
    }
});

router.delete('/deleteAll', async (req, res) => {
    const { id } = req.body;
    try {
        const findUserId = await User.findOne({ where: { id } });
        const findUserIdInDrawings = await Drawings.findOne({
            where: { userId: findUserId.dataValues.id }
        });

        await Drawings.destroy({
            where: { userId: findUserId.dataValues.id }
        });
        await Figures.destroy({
            where: { id: findUserIdInDrawings.dataValues.figureId }
        });
        await User.destroy({ where: { id } });

        res.status(200).send('유저 호재 정보 삭제 완료.');
    } catch (err) {
        res.status(500).send('유저 호재 정보 삭제 실패.');
    }
});

router.post('/drawings', async (req, res) => {
    try {
        await Drawings.create({
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

router.post('/figures', async (req, res) => {
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
