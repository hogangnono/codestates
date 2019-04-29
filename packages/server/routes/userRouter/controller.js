/* eslint-disable camelcase */
const sequelize = require('sequelize');
const { User, Drawing, Figure, Factor } = require('../../models');
const Op = sequelize.Op;

/* Signup */
exports.signup = async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await User.sequelize.transaction();
        await User.findOrCreate({ where: { name }, transaction });
        await transaction.commit();
        res.status(200).send(
            `어서오세요! ${name}님!\n로그인에 성공했습니다 :)`
        );
    } catch (err) {
        await transaction.rollback();
        res.status(500).send('이름 저장에 실패했습니다.');
    }
};

/* Load data */
exports.load = async (req, res) => {
    const { name, bound, factors } = req.body;
    let transaction;
    const data = [];
    const factorIdArray = [];
    // 필터에서 호재를 선택하면 해당 호재를 load 함
    if (factors && factors.length) {
        try {
            transaction = await User.sequelize.transaction();
            const factorId = await Factor.findAll({
                where: { name: { [Op.in]: factors } },
                transaction
            });
            factorId.forEach(idTable => {
                factorIdArray.push(idTable.dataValues.id);
            });
            const result = await Figure.findAll({
                include: [
                    {
                        model: Drawing,
                        attributes: ['title', 'description'] // Drawing table에서 title, description column만 가져옴
                    }
                ],
                where: {
                    factor_id: { [Op.in]: factorIdArray },
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    start_lat: {
                                        [Op.between]: [
                                            bound._min._lat - 0.01,
                                            bound._max._lat + 0.01
                                        ]
                                    }
                                },
                                {
                                    start_lng: {
                                        [Op.between]: [
                                            bound._min._lng - 0.01,
                                            bound._max._lng + 0.01
                                        ]
                                    }
                                }
                            ],
                            [Op.and]: [
                                {
                                    end_lat: {
                                        [Op.between]: [
                                            bound._min._lat - 0.01,
                                            bound._max._lat + 0.01
                                        ]
                                    }
                                },
                                {
                                    end_lng: {
                                        [Op.between]: [
                                            bound._min._lng - 0.01,
                                            bound._max._lng + 0.01
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                transaction
            });
            await transaction.commit();
            data.push(result);
        } catch (err) {
            console.log('/load ERROR :: Reason :: ', err);
            await transaction.rollback();
            res.status(400).send('데이터 요청에 실패했습니다.');
        }
    }
    // 주변호재 찾기
    if (!factors || factors.length === 0) {
        try {
            transaction = await User.sequelize.transaction();
            const result = await Figure.findAll({
                include: [
                    {
                        model: Drawing,
                        attributes: ['title', 'description'] // Drawing table에서 title, description column만 가져옴
                    }
                ],
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    start_lat: {
                                        [Op.between]: [
                                            bound._min._lat - 0.01,
                                            bound._max._lat + 0.01
                                        ]
                                    }
                                },
                                {
                                    start_lng: {
                                        [Op.between]: [
                                            bound._min._lng - 0.01,
                                            bound._max._lng + 0.01
                                        ]
                                    }
                                }
                            ],
                            [Op.and]: [
                                {
                                    end_lat: {
                                        [Op.between]: [
                                            bound._min._lat - 0.01,
                                            bound._max._lat + 0.01
                                        ]
                                    }
                                },
                                {
                                    end_lng: {
                                        [Op.between]: [
                                            bound._min._lng - 0.01,
                                            bound._max._lng + 0.01
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                transaction
            });
            await transaction.commit();
            data.push(result);
        } catch (err) {
            console.log('/load ERROR :: Reason :: ', err);
            await transaction.rollback();
            res.status(400).send('데이터 요청에 실패했습니다.');
        }
    }
    // when user login
    if (name) {
        try {
            transaction = await User.sequelize.transaction();
            const userId = await User.findOne({
                where: { name },
                transaction
            }).get('id');
            const result = await Figure.findAll({
                include: [
                    { model: Drawing, where: { user_id: userId }, transaction }
                ], // include => join을 함
                where: {
                    // user_id: userId,
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    start_lat: {
                                        [Op.between]: [
                                            bound._min._lat - 0.01,
                                            bound._max._lat + 0.01
                                        ]
                                    }
                                },
                                {
                                    start_lng: {
                                        [Op.between]: [
                                            bound._min._lng - 0.01,
                                            bound._max._lng + 0.01
                                        ]
                                    }
                                }
                            ],
                            [Op.and]: [
                                {
                                    end_lat: {
                                        [Op.between]: [
                                            bound._min._lat - 0.01,
                                            bound._max._lat + 0.01
                                        ]
                                    }
                                },
                                {
                                    end_lng: {
                                        [Op.between]: [
                                            bound._min._lng - 0.01,
                                            bound._max._lng + 0.01
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                transaction
            });
            await transaction.commit();
            data.push(result);
        } catch (err) {
            console.log('/load ERROR :: Reason :: ', err);
            await transaction.rollback();
            res.status(400).send('데이터 요청에 실패했습니다.');
        }
    }
    res.status(200).json(data);
};

/* Save data */
exports.save = async (req, res) => {
    let transaction;
    const { payload } = req.body;
    const { value } = JSON.parse(payload).actions[0];
    try {
        transaction = await Drawing.sequelize.transaction();
        if (value === 'Refuse') {
            res.status(200).send('호재 데이터를 저장하지 않았습니다.');
        } else {
            const { name, data, drawingSetInfo } = JSON.parse(value);
            if (Array.isArray(data)) {
                // console.log('1');
                const userID = await User.findOne({
                    where: { name },
                    transaction
                }).get('id');
                // console.log('2');
                const drawingId = await Drawing.create(
                    {
                        user_id: userID,
                        title: drawingSetInfo.title,
                        description: drawingSetInfo.description
                    },
                    transaction
                ).get('id');
                // console.log('3');
                const dataWithDrawingId = data.map(figure => {
                    const returnFigure = {
                        ...figure,
                        drawing_id: drawingId
                    };
                    return returnFigure;
                });
                // console.log('4');
                console.log(dataWithDrawingId);
                await Figure.bulkCreate(dataWithDrawingId);
                // console.log('5');
                await transaction.commit();
                // console.log('6');
                res.status(200).send('성공적으로 호재 정보를 저장했습니다! :)');
            }
        }
    } catch (err) {
        await transaction.rollback();
        res.status(400).send('데이터 저장에 실패했습니다.');
    }
};

exports.userdrawing = async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await Drawing.sequelize.transaction();
        const userId = await User.findOne({
            where: { name }
        }).get('id');
        const result = await Drawing.findAll({
            where: { user_id: userId },
            transaction
        });
        await transaction.commit();
        res.status(200).send(result);
    } catch (err) {
        await transaction.rollback();
        res.status(500).send('Failed to load your drawing data');
    }
};

/* Delete all data */
exports.deleteAll = async (req, res) => {
    const { name } = req.body;
    let transaction;
    try {
        transaction = await User.sequelize.transaction();
        const findUserName = await User.findOne({
            where: { name },
            transaction
        });
        if (findUserName !== null) {
            await Drawing.destroy({
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
};
