const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

router.post('/upload', apiController.uploadOASFile);

module.exports = router;
