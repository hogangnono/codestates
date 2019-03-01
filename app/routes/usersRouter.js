var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

const { users, drawings, factorCategories, figures } = require('../models');

router.post('/', (req, res) => {
    const { name } = req.body;
    users
        .findOrCreate({ where: { name: name } })

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
            console.log('POST /users/ :: request was failed beacuse :\n', err);
            console.log('============================');
            res.status(500).send('POST /users/ request was failed');
        });
});

router.get('/load', async (req, res) => {
    try {
        const User = await users.findAll();
        const Drawings = await drawings.findAll();
        const FactorCategories = await factorCategories.findAll();
        const Figures = await figures.findAll();
        const data = [User, Drawings, FactorCategories, Figures];
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send('User 전체 조회 실패.');
    }
});

router.delete('/deleteAll', async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const findUserName = await users.findOne({ where: { name } });
        if (findUserName !== null) {
            const findUserIdInDrawings = await drawings.findOne({
                where: { userId: findUserName.dataValues.id }
            });

            await drawings.destroy({
                where: { userId: findUserName.dataValues.id }
            });
            await figures.destroy({
                where: { id: findUserIdInDrawings.dataValues.figureId }
            });
            await transaction.commit();
            res.status(200).send('유저 호재 정보 삭제 완료.');
        } else {
            res.status(404).send('유저 호재 정보 없음');
        }
        // await User.destroy({ where: { name } });
    } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(500).send('유저 호재 정보 삭제 실패.');
    }
});

router.post('/save', async (req, res) => {
    const { name, figureInfo, drawingInfo } = req.body;
    const { factorCategoryId } = figureInfo;
    const isValidfactorCategoryId = !!(
        factorCategoryId >= 1 && factorCategoryId <= 9
    );

    try {
        if (isValidfactorCategoryId) {
            const findUser = await users.findOne({ where: { name } });
            const userID = await findUser.dataValues.id;
            const createdRowInFigures = await figures.create(figureInfo);
            const figureId = await createdRowInFigures.dataValues.id;

            drawings.create({
                mapCenterLat: drawingInfo.mapCenterLat,
                mapCenterLng: drawingInfo.mapCenterLng,
                userID,
                figureId
            });
            console.log('========= RESULT ===========');
            console.log('POST /save/ :: 저장을 완료했습니다');
            console.log('============================');
            res.status(201).send('Figures에 데이터를 추가했습니다.');
        }
    } catch (err) {
        console.log('========= RESULT ===========');
        console.log('POST /save/ :: request was failed beacuse : \n', err);
        console.log('============================');
        res.status(400).send(
            '데이터 등록 실패! 이유는 console을 확인해야해요!'
        );
    }
});

module.exports = router;

/*
{
	"name": "az",
	"figureInfo": {
		"shapeType": "round",
		"shapePath": "[x,y]",
		"description": "this is test description",
		"priority": 1,
		"borderWidth": 2,
		"borderColor": "red",
		"innerColor": "black",
		"factorCategoryId": 3
	}
}
*/
