const sequelize = require('sequelize');
const { Drawing, Figure } = require('../../models');
const Op = sequelize.Op;

exports.nearbylist = async (req, res) => {
    const { bound } = req.body;

    let transaction;
    try {
        transaction = await Drawing.sequelize.transaction();
        const result = await Figure.findAll({
            include: [
                {
                    model: Drawing
                }
            ],
            where: {
                [Op.or]: [
                    {
                        start_lat: {
                            [Op.between]: [
                                bound._min._lat - 0.01,
                                bound._max._lat + 0.01
                            ]
                        },
                        start_lng: {
                            [Op.between]: [
                                bound._min._lng - 0.01,
                                bound._max._lng + 0.01
                            ]
                        }
                    },
                    {
                        end_lat: {
                            [Op.between]: [
                                bound._min._lat - 0.01,
                                bound._max._lat + 0.01
                            ]
                        },
                        end_lng: {
                            [Op.between]: [
                                bound._min._lat - 0.01,
                                bound._max._lat + 0.01
                            ]
                        }
                    }
                ]
            }
        }, transaction);
        res.status(200).json(result);
        await transaction.commit();
        // data.push(result);
    } catch (err) {
        console.log('/search ERROR :: Reason :: ', err);
        await transaction.rollback();
        res.status(400).send('데이터 요청에 실패했습니다.');
    }
};
