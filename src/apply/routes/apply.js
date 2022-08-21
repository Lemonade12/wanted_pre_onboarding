const express = require('express');
const applyServices = require('../services/apply');

const router = express.Router();

router.post('/apply/:id',applyServices.applyOpening);

module.exports = router;