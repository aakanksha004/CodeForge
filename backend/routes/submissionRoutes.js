const express = require('express');
const { submitCode, getSubmissions } = require('../controllers/submissionController');
const router = express.Router();

router.post('/', submitCode);
router.get('/', getSubmissions);

module.exports = router;

