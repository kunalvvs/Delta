const express = require('express');
const router = express.Router();
const { analyzePrompt, getHistory } = require('../controllers/promptController');

router.post('/analyze', analyzePrompt);
router.get('/history', getHistory);

module.exports = router;
