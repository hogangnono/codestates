var express = require('express');
var router = express.Router();
var User = require('../models').users;
var Drawings = require('../models').drawings;
var FactorCategories = require('../models').factorCategories;
var Figures = require('../models').figures;

router.post('/', (req, res) => {
    const { name } = req.body;
    console.log('name', name);
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

router.post('/save', (req, res) => {
    const { name, figureInfo, drawingInfo } = req.body;
    const { factorCategoryId } = figureInfo;
    const isValidfactorCategoryId = !!(factorCategoryId >= 1 && factorCategoryId <= 9);

    if (isValidfactorCategoryId) {
        User
            .findOne({
                where: {
                    name: name
                }
            })
            .then(row => {
                const userID = row.dataValues.id;
                Figures
                    .create(figureInfo)
                    .then(createdRow => {
                        console.log('dataValues: ', createdRow.dataValues);
                        const figureid = createdRow.dataValues.id;
                        Drawings.create({
                            mapCenterLat: drawingInfo.mapCenterLat,
                            mapCenterLng: drawingInfo.mapCenterLng,
                            userID: userID,
                            figureId: figureid
                        });
                    });

                res.status(201).send('Figures에 데이터를 추가했습니다.');
            })
            .catch(err => {
                res.status(400).send('그런 사람 없습니다 !');
            });
    } else {
        console.log('데이터 등록 실패');
        res.status(500).send('실패했어요! ㅠㅠ');
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
