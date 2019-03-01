var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

const { user, drawing, factor } = require('../models');

router.post('/', (req, res) => {
    const { name } = req.body;
    user.findOrCreate({ where: { name: name } })

        .spread((users, created) => {
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
                    users.dataValues
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
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const User = await user.findAll();
        const Drawings = await drawing.findAll();
        const Factor = await factor.findAll();
        const data = [User, Drawings, Factor];
        await transaction.commit();
        res.status(200).send(data);
    } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(500).send('User 호재 조회 실패.');
    }
});

router.delete('/deleteAll', async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const findUserName = await user.findOne({ where: { name } });
        if (findUserName !== null) {
            const findUserIdInDrawings = await drawing.findOne({
                where: { userId: findUserName.dataValues.id }
            });

            await drawing.destroy({
                where: { userId: findUserName.dataValues.id }
            });
            await factor.destroy({
                where: { id: findUserIdInDrawings.dataValues.factor_id }
            });
            await transaction.commit();
            res.status(200).send('유저 호재 정보 삭제 완료.');
        } else {
            res.status(404).send('유저 호재 정보 없음');
        }
    } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(500).send('유저 호재 정보 삭제 실패.');
    }
});

router.post('/save', async (req, res) => {
    // const { name, figureInfo, drawingInfo } = req.body;
    // const { factorCategoryId } = figureInfo;
    // const isValidfactorCategoryId = !!(
    //     factorCategoryId >= 1 && factorCategoryId <= 9
    // );
    // try {
    //     if (isValidfactorCategoryId) {
    //         const findUser = await user.findOne({ where: { name } });
    //         const userID = await findUser.dataValues.id;
    //         const createdRowInFigures = await figures.create(figureInfo);
    //         const figureId = await createdRowInFigures.dataValues.id;
    //         drawing.create({
    //             mapCenterLat: drawingInfo.mapCenterLat,
    //             mapCenterLng: drawingInfo.mapCenterLng,
    //             userID,
    //             figureId
    //         });
    //         console.log('========= RESULT ===========');
    //         console.log('POST /save/ :: 저장을 완료했습니다');
    //         console.log('============================');
    //         res.status(201).send('Figures에 데이터를 추가했습니다.');
    //     }
    // } catch (err) {
    //     console.log('========= RESULT ===========');
    //     console.log('POST /save/ :: request was failed beacuse : \n', err);
    //     console.log('============================');
    //     res.status(400).send(
    //         '데이터 등록 실패! 이유는 console을 확인해야해요!'
    //     );
    // }
});

module.exports = router;
