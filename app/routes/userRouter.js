const express = require('express');
const router = express.Router();
const { user, drawing, factor } = require('../models');

router.get('/', (req, res, next) => {
    res.status(200);
    res.send('Welcome to hojae hojae!\nthis is a user page');
});

router.post('/load', async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await user.sequelize.transaction();
        const findUserTable = await user.findOne({
            where: { name },
            transaction
        });
        if (findUserTable !== null) {
            const findUserDrawingTable = await drawing.findOne({
                where: { user_id: findUserTable.dataValues.id }
            });
            const findUserFactorTable = await factor.findOne({
                where: { id: findUserDrawingTable.dataValues.factor_id },
                transaction
            });

            const result = [findUserDrawingTable, findUserFactorTable];

            await transaction.commit();
            res.status(200).send(result);
        } else {
            await transaction.commit();
            res.status(204).send('유저 데이터 정보 없음');
        }
    } catch (err) {
        console.log(err);
        if (transaction) await transaction.rollback();
        res.status(500).send('User 데이터 조회 실패.');
    }
});

router.delete('/deleteAll', async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await user.sequelize.transaction();
        const findUserName = await user.findOne({ where: { name } });
        if (findUserName !== null) {
            await drawing.destroy({
                where: { user_id: findUserName.dataValues.id }
            });
            await transaction.commit();
            res.status(200).send('유저 호재 정보 삭제 완료.');
        } else {
            await transaction.commit();
            res.status(404).send('유저 호재 정보 없음');
        }
    } catch (err) {
        if (transaction) await transaction.rollback();
        res.status(500).send('유저 호재 정보 삭제 실패.');
    }
});

module.exports = router;
