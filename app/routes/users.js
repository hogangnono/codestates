var express = require('express');
var router = express.Router();
var User = require('../models').users;
var Drawings = require('../models').drawings;
/* GET users listing. */

// router.post('/', async (req, res) => {
//     try {
//         await User.create({
//             name: req.body.name
//         });
//         res.status(200).send('성공');
//     } catch (err) {
//         res.status(500).send('fail');
//     }
// });

// router.get('/', (req, res) => {
//     User.findAll()
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             res.sendStatus(500);
//         });
// });

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        await Drawings.create({
            drawingSetNumber: req.body.drawingSetNumber,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            usersId: req.body.usersId,
            figuresId: req.body.figuresId
        });
        res.status(200).send('성공');
    } catch (err) {
        res.status(500).send('fail');
    }
});
module.exports = router;
