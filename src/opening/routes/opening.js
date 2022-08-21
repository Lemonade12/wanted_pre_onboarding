const express = require('express');
const openingServices = require('../services/opening');

const router = express.Router();

router.post('/opening', openingServices.createOpening);//1
router.put('/opening/:id',openingServices.updateOpening);//2
router.delete('/opening/:id',openingServices.deleteOpening);//3
router.get('/opening',openingServices.readOpening);//4-1,4-2(회사명에대한검색)
router.get('/opening/detail/:id',openingServices.readOpeningDetail);

module.exports = router;