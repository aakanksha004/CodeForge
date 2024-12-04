const express = require('express');
const { getProblems, addProblem, fetchAndStoreProblems,getProblemById } = require('../controllers/problemController');
const router = express.Router();


// Get problem by ID
router.get('/:id', getProblemById);

router.get('/', getProblems);
router.post('/', addProblem);
router.get('/fetch', fetchAndStoreProblems);


module.exports = router;
