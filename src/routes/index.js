const express = require('express');
const openingRouter = require('../opening/routes/opening');
const applyRouter = require('../apply/routes/apply')
const router = express.Router();

router.use(applyRouter);
router.use(openingRouter);


module.exports = router;