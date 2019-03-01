var express = require('express');
var router = express.Router();
var User = require('../models').user;
var Drawing = require('../models').drawing;
// var FactorCategories = require('../models').factor;

router.get('/', async (req, res, next) => {
    const { name } = req.body;
    await User.create({ name });
    res.status(200).send('유저 이름을 Row로 저장했습니다! :)');
});

router.post('/save', async (req, res, next) => {
    const factorId = req.body.factor_id;
    const isValidFactorId = !!(factorId >= 1 || factorId <= 6);

    if (isValidFactorId) {
        await Drawing.create(req.body);
        res.status(200).send('성공적으로 호재 정보를 저장했습니다! :)');
    }

    res.status(400).send('데이터 저장에 실패했습니다.');
});

module.exports = router;
