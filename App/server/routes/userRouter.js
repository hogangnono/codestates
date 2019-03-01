const express = require('express');
const router = express.Router();
const { user, drawing, factor } = require('../models');

router.get('/', async (req, res, next) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await user.sequelize.transaction();
        await user.findOrCreate({ where: { name } });
        await transaction.commit();
        res.status(200).send('유저 이름을 Row로 저장했습니다! :)');
    } catch (err) {
        await transaction.rollback();
        res.status(500).send('이름 저장에 실패했습니다.');
    }
});

router.post('/load', async (req, res) => {
    const { name, factor } = req.body;
    console.log(name);
    let transaction;
    if (name === '') {
        try {
            transaction = await user.sequelize.transaction();
            const findFactorTable = await drawing.findAll({
                where: { factor_id: factor },
                transaction
            });
            if (findFactorTable !== null) {
                const result = findFactorTable;
                await transaction.commit();
                res.status(200).send(result);
            } else {
                await transaction.commit();
                res.status(204).json('호재 데이터 정보 없음');
            }
        } catch (err) {
            console.log(err);
            await transaction.rollback();
            res.status(500).send('호재 데이터 조회 실패.');
        }
    } else if (factor === '') {
        try {
            transaction = await user.sequelize.transaction();
            const findUserTable = await user.findOne({
                where: { name },
                transaction
            });

            if (findUserTable !== null) {
                const findUserDrawingTable = await drawing.findAll({
                    where: { user_id: findUserTable.dataValues.id },
                    transaction
                });
                // const findUserFactorTable = await factor.findAll({
                //     where: { id: findUserDrawingTable.dataValues.factor_id },
                //     transaction
                // });
                const findUserFactorTable = await factor.findAll({
                    transaction
                });

                const result = [findUserDrawingTable, findUserFactorTable];

                await transaction.commit();
                res.status(200).send(result);
            } else {
                await transaction.commit();
                res.status(204).json('유저 데이터 정보 없음');
            }
        } catch (err) {
            console.log(err);
            await transaction.rollback();
            res.status(500).send('User 데이터 조회 실패.');
        }
    }
});

router.post('/save', async (req, res, next) => {
    const factorId = req.body.factor_id;
    const isValidFactorId = !!(factorId >= 1 || factorId <= 6);
    let transaction;
    try {
        if (isValidFactorId) {
            transaction = await drawing.sequelize.transaction();
            await drawing.create(req.body, { transaction });
            await transaction.commit();
            res.status(200).send('성공적으로 호재 정보를 저장했습니다! :)');
        }
    } catch (err) {
        await transaction.rollback();
        console.log('에러가 난 이유는요!! \n', err);
        res.status(400).send('데이터 저장에 실패했습니다.');
    }
});

router.delete('/deleteAll', async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await user.sequelize.transaction();
        const findUserName = await user.findOne({
            where: { name },
            transaction
        });
        if (findUserName !== null) {
            await drawing.destroy({
                where: { user_id: findUserName.dataValues.id },
                transaction
            });
            await transaction.commit();
            res.status(200).send('유저 호재 정보 삭제 완료.');
        } else {
            await transaction.commit();
            res.status(404).send('유저 호재 정보 없음');
        }
    } catch (err) {
        await transaction.rollback();
        res.status(500).send('유저 호재 정보 삭제 실패.');
    }
});

module.exports = router;
